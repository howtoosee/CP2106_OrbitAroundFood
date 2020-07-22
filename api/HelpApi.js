import * as firebase from 'firebase';

import combineAllData from "./combineAllData";

const helpCollection = firebase.firestore().collection("HELPS");
const foodCollection = firebase.firestore().collection("FOODS");

const dateObj = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


async function readHelps(setHelps) {
    let helps = [];

    const todayDate = (dateObj.getMonth() + 1) + '.' + dateObj.getDate();

    const querySnapshot = await helpCollection
        .where('dateInfo.dateShorten', '==', todayDate)
        .where('isOpen', '==', true)
        .orderBy('dateInfo.timestamp', 'desc')
        .orderBy('dateInfo.timeETA', 'desc')
        .get()


    await forEachDoc(querySnapshot.docs, async function (docSnapshot) {
        const docData = docSnapshot.data();
        const foodSnapshot = await foodCollection.doc(docData.foodId).get();

        let foodObj = await combineAllData(foodSnapshot.data(), docData.foodId);

        const combinedObj = {
            helpId: docData.helpId,
            askerInfo: docData.askerInfo,
            dateInfo: docData.dateInfo,
            foodObj: foodObj,
            isOpen: docData.isOpen,
        };

        // console.log(combinedObj);
        helps.push(combinedObj);
    });

    setHelps(helps);
}


async function setHelper(helpId, helperObj) {

    await helpCollection.doc(helpId)
        .update({
            helperInfo: {
                helperId: helperObj.userId,
                helperContact: helperObj.contact,
                helperRemark: helperObj.remark,
            },
            isOpen: false,
        })
        .catch(err => console.log("Error updating help doc:", err));

}


async function writeHelp(foodId, userObj, timeObj) {

    const genHelpID = (userID) => firebase.database.ServerValue.TIMESTAMP + '_by_' + userID;

    const todayDate = (dateObj.getMonth() + 1) + '.' + dateObj.getDate();
    const date = months[dateObj.getMonth()] + ' ' + dateObj.getDate();

    const helpId = genHelpID(userObj.userId);

    const helpObj = {
        helpId: helpId,
        isOpen: true,
        foodId: foodId,
        dateInfo: {
            date: date,
            dateShorten: todayDate,
            timestamp: timeObj.timestamp,
            timeETA: timeObj.timeETA,
            firebaseTimestamp: firebase.database.ServerValue.TIMESTAMP,
        },

        askerInfo: {
            askerId: userObj.userId,
            askerRemark: userObj.askerRemark,
            askerContact: userObj.contact,
            dropOffLocation: userObj.location,
        }
    }

    await helpCollection
        .doc(helpId)
        .set(helpObj)
        .catch(err => console.log("Error writing help:", err));

}


async function getHelpUpdates(helpId, setHelpObj) {
    const docRef = await helpCollection.doc(helpId);

    return await docRef.onSnapshot(() => {
            setHelpObj(docRef.get().data());
        },
        err => console.log('Error getting help doc updates:', err));
}


async function readAllUserRelatedRequests(setRequests, setHelps) {
    const username = firebase.auth().currentUser.displayName;

    let requests = []; // requests i've made
    let helps = []; // requests i've helped

    const requestSnapshot = await helpCollection
        .where('askerInfo.askerId', '==', username)
        .orderBy('dateInfo.timestamp', 'desc')
        .get();

    await forEachDoc(requestSnapshot.docs, async function (requestDoc) {
        const docData = requestDoc.data();
        const foodSnapshot = await foodCollection.doc(docData.foodId).get();

        let foodObj = await combineAllData(foodSnapshot.data(), docData.foodId);

        const combinedObj = {
            helpId: docData.helpId,
            isOpen: docData.isOpen,
            dateInfo: docData.dateInfo,
            askerInfo: docData.askerInfo,
            helperInfo: docData?.helperInfo,
            foodObj: foodObj,
        };

        requests.push(combinedObj);

    })
        .then(() => setRequests(requests));

    const helpsSnapshot = await helpCollection
        .where('helperInfo.helperId', '==', username)
        .orderBy('dateInfo.timestamp', 'desc')
        .get();

    await forEachDoc(helpsSnapshot.docs, async function (helpDoc) {
        const docData = helpDoc.data();
        const foodSnapshot = await foodCollection.doc(docData.foodId).get();

        let foodObj = await combineAllData(foodSnapshot.data(), docData.foodId);

        const combinedObj = {
            helpId: docData.helpId,
            isOpen: docData.isOpen,
            dateInfo: docData.dateInfo,
            askerInfo: docData.askerInfo,
            helperInfo: docData?.helperInfo,
            foodObj: foodObj,
        };

        helps.push(combinedObj);

    })
        .then(() => setHelps(helps));

}


async function forEachDoc(doc, callback) {
    for (let i = 0; i < doc.length; i++) {
        await callback(doc[i]);
    }
}


export {readHelps, setHelper, writeHelp, getHelpUpdates, readAllUserRelatedRequests};