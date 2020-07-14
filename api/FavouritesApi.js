import firebaseDB from '../constants/firebaseDB';
import combineAllData from './combineAllData';

const foodCollection = firebaseDB.firestore().collection("FOODS");

let favsArr = [];

function addFavourite(foodID) {
    if (!favsArr.includes(foodID)) {
        favsArr.push(foodID);
    }
}


function removeFavourite(foodID) {
    favsArr = favsArr.filter(item => item !== foodID);
}


async function readFavourites(setFavObjArr) {
    let favObjArr = [];

    await forEachDoc(favsArr, async function (foodID) {
        const snapshotData = foodCollection.doc(foodID).get().data;
        const foodObj = await combineAllData(snapshotData, foodID);
        favObjArr.push(foodObj);
    });

    setFavObjArr(favObjArr);
}


// custom async forEach function
async function forEachDoc(docs, callback) {
    for (let i = 0; i < docs.length; i++) {
        await callback(docs[i]);
    }
}


export {addFavourite, removeFavourite, readFavourites};

