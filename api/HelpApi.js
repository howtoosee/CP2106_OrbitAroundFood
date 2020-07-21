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
                        time: 'est time of food arrival'
                        date: 'request date'
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
                            remark: 'asker remark'
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
        const foodObj = foodSnapshot.data();
        let combinedObj = await combineAllData(foodObj, docData.foodId);

        combinedObj.helpId = docSnapshot.id;
        combinedObj.isOpen = docData.isOpen;

        combinedObj.foodId = docData.foodId;
        combinedObj.time = docData.time;
        combinedObj.date = docData.date;

        combinedObj.asker = {
            name: docData.askerId,
            contact: docData.askerContact,
            dropOff: docData.dropOffLocation,
            remark: docData.askerRemark
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
                    remark: 'helper's remark'
                 }
     */

    await helpCollection.doc(helpId)
        .update({
            helperId: helperObj.Id,
            helperContact: helperObj.contact,
            helperRemark: helperObj.remark,
            isOpen: false
        }
        )
        .catch(err => console.log("Error updating help doc:", err));

}


async function writeHelp(foodId, userObj, timeObj) {
    /*
    Require:
        (string) foodId: 'foodId',
        (Object) userObj: {
                    userId: 'asker name',
                    contact: 'asker phone number',
                    location: 'drop off location'
                    askerRemark: 'asker remark'
                 }
        (Object) timeObj: {
                    estTime: 'estimated time of food arrival',
                    date: 'Request Date',
                    time: 'today',
                    timestamp: 'timestamp for ID'
        }

     */

    const genHelpID = (timestamp, userID) => timestamp + '_@' + userID;
    // const timestamp = date.getTime();
    const timestamp = timeObj.timestamp
    // const today = date.getMonth() + '.' + date.getDate();

    const helpId = genHelpID(timestamp, userObj.userId);

    const helpObj = {
        foodId: foodId,
        isOpen: true,
        timestamp: timeObj.time,
        time: timeObj.estTime,
        date: timeObj.date,
        askerId: userObj.userId,
        askerContact: userObj.contact,
        askerRemark: userObj.askerRemark,
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


async function readAllUserRelatedRequests(username, setRequests) {
    let requests = []; // requests i've made
    let helps = []; // requests i've helped

    async function callBack(docSnapshot, arr) {
        const docData = docSnapshot.data();
        const foodSnapshot = await foodCollection.doc(docData.foodId).get();

        const foodObj = foodSnapshot.data();
        let combinedObj = await combineAllData(foodObj, docData.foodId);

        combinedObj.helpId = docSnapshot.id;

        combinedObj.foodId = docData.foodId;
        combinedObj.time = docData.time;
        combinedObj.date = docData.date;

        combinedObj.asker = {
            name: docData.askerId,
            contact: docData.askerContact,
            dropOff: docData.dropOffLocation,
            remark: docData.askerRemark
        }

        combinedObj.helper ={
            name: docData.helperId,
            contact: docData.helperContact,
            remark: docData.helperRemark
        }

        arr.push(combinedObj);
    }


    const requestQuerySnapshot = await helpCollection
        .where('askerId', '==', username)
        .where('isOpen', '==', false)
        .orderBy('timestamp', 'desc')
        .get();

    await forEachDoc(requestQuerySnapshot.docs, function (docSnapshot) {
        callBack(docSnapshot, requests);
    });

    // if above doesnt work, try this:
    // await forEachDoc(requestQuerySnapshot.docs, async function (docSnapshot) {
    //     await callBack(docSnapshot, requests);
    // });


    const helpQuerySnapshot = await helpCollection
        .where('helperId', '==', username)
        .where('isOpen', '==', false)
        .orderBy('timestamp', 'desc')
        .get();

    await forEachDoc(helpQuerySnapshot.docs, async function (docSnapshot) {
        callBack(docSnapshot, helps);
    });

    // if above doesnt work, try this:
    // await forEachDoc(helpQuerySnapshot.docs, async function (docSnapshot) {
    //     await callBack(docSnapshot, helps);
    // });


    const allRequests = {
        myRequests: requests,
        myHelps: helps
    }

    setRequests(allRequests);
}

async function forEachDoc(doc, callback) {
    for (let i = 0; i < doc.length; i++) {
        await callback(doc[i]);
    }
}


export { readHelps, setHelper, writeHelp, getHelpUpdates, closeHelpRequest, readAllUserRelatedRequests };