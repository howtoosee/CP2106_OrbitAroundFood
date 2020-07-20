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
                        helpid: 'helpId',
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

    // const today = date.getMonth() + '.' + date.getDate();
    const querySnapshot = await helpCollection
        // .where('date', '==', today)
        .where('isOpen', '==', true)
        .orderBy('timestamp', 'desc')
        .get()


    await forEachDoc(querySnapshot.docs, async function (docSnapshot) {
        const docData = docSnapshot.data();
        const foodSnapshot = await foodCollection.doc(docData.foodId).get();
        const foodObj = await foodSnapshot.data();
        let combinedObj = await combineAllData(foodObj, docData.foodId);

        combinedObj.helpid = docSnapshot.id;
        combinedObj.isOpen = docData.isOpen

        combinedObj.foodId = docData.foodId;

        combinedObj.asker = {
            name: docData.askerId,
            contact: docData.askerContact,
            dropOff: docData.dropOffLocation
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
                    userId: 'asker name',
                    contact: 'asker phone number',
                    location: 'drop off location'
                 }
     */

    const genHelpID = (timestamp, userID) => timestamp + '_by_' + userID;
    const timestamp = date.getTime();
    const today = date.getMonth() + '.' + date.getDate();

    const helpId = genHelpID(timestamp, userObj.userId);

    const helpObj = {
        foodId: foodId,
        isOpen: true,
        timestamp: timestamp,
        date: today,
        askerId: userObj.userId,
        askerContact: userObj.contact,
        dropOffLocation: userObj.location
    }

    await helpCollection.doc(helpId).set(helpObj)
        .catch(err => console.log("Error writing help:", err));

}


async function getHelpUpdates(helpId, setHelpObj) {
    const docRef = await helpCollection.doc(helpId);

    await docRef.onSnapshot(() => {
            setHelpObj(docRef.get().data());
        },
        err => console.log('Error getting help doc updates:', err));
}

async function closeHelpRequest(helpId) {
    await helpCollection.doc(helpId)
        .set({
            isOpen: false
        })
        .catch(err => console.log('Error closing request:', err));
}


async function forEachDoc(doc, callback) {
    for (let i = 0; i < doc.length; i++) {
        await callback(doc[i]);
    }
}

export {readHelps, setHelper, writeHelp, getHelpUpdates};
