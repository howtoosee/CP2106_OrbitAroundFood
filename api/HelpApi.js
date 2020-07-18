import firebaseDB from '../constants/firebaseDB';

import combineAllData from "./combineAllData";

const helpCollection = firebaseDB.firestore().collection("HELPS");
const foodCollection = firebaseDB.firestore().collection("FOODS");

const date = new Date();


async function readHelps(setHelps) {
    /*
    Require:
        (function) setHelps: setter function for useState

    Returns
        (Array) helps: [
            (Object) combinedObj: {
                        id: 'helpId',
                        isOpen: (boolean) whether request is open,
                        foodId: 'foodId',
                        name: 'foodName',
                        price: 'foodPrice',
                        storeId: 'store ID,
                        store: {
                            store_name: 'store name',
                            location: 'store location',
                            open_hours: 'open hours',
                            close_hours: 'close hours'
                        },
                        asker: {
                            name: 'asker name',
                            contact: 'asker contact',
                            dropOff: 'drop off location'
                        }
                     }
        ]
     */

    let helps = [];

    const today = date.getMonth() + '.' + date.getDate();
    const snapshot = await helpCollection
        .where('date', '==', today)
        .where('status', '==', true)
        .orderBy('timestamp', 'desc')
        .get()
        .catch(err => console.log("Error getting helps:", err));


    await forEachDoc(snapshot.doc, async function (docSnapshot) {
        const foodSnapshot = await foodCollection.doc(docSnapshot.foodId).get();
        const foodObj = await foodSnapshot.data();
        let combinedObj = await combineAllData(foodObj, docSnapshot.foodId);

        combinedObj.id = docSnapshot.id;
        combinedObj.isOpen = docSnapshot.isOpen

        combinedObj.foodId = docSnapshot.foodId;

        combinedObj.asker = {
            name: docSnapshot.userid,
            contact: docSnapshot.contact,
            dropOff: docSnapshot.dropOff
        }

        helps.push(combinedObj);
    });

    // return helps;
    setHelps(helps);
}


async function setHelper(helpId, helperObj) {
    /*
    Require:
        (String) helpId: 'help id',
        (Object) helperObj: {
                    id: 'helper's name',
                    contact: 'helper's contact'
                 }
     */

    await helpCollection.doc(helpId)
        .update({
                helperid: helperObj.id,
                helperContact: helperObj.contact,
                isOpen: false
            }
        )
        .catch(err => console.log("Error updating help doc:", err));

}


async function writeHelp(foodId, userObj) {
    /*
    Require:
        (string) foodId: 'foodId',

        (Object) userObj: {
                    userid: 'asker name',
                    contact: 'asker phone number',
                    location: 'drop off location'
                 }
     */

    const genHelpID = (timestamp, userID) => timestamp + '_@' + userID;
    const timestamp = date.getTime();
    const today = date.getMonth() + '.' + date.getDate();

    const helpId = genHelpID(timestamp, userObj.userid);

    const helpObj = {
        foodId: foodId,
        isOpen: true,
        timestamp: timestamp,
        date: today,
        askerId: userObj.userid,
        askerContact: userObj.contact,
        dropOffLocation: userObj.location
    }

    await helpCollection.doc(helpId).set(helpObj)
        .catch(err => console.log("Error writing help:", err));

}


async function forEachDoc(doc, callback) {
    for (let i = 0; i < doc.length; i++) {
        await callback(doc[i]);
    }
}

export {readHelps, setHelper, writeHelp};
