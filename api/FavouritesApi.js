import firebaseDB from '../constants/firebaseDB';
import combineAllData from './combineAllData';

const foodCollection = firebaseDB.firestore().collection("FOODS");


let favsArr = [];


function isFavourite(foodID) {
    return favsArr.includes(foodID);
}


function addFavourite(foodID) {
    if (!favsArr.includes(foodID)) {
        favsArr.push(foodID);
    }
    console.log("Added favourite:", foodID);
}


function removeFavourite(foodID) {
    favsArr = favsArr.filter(item => item !== foodID);
    console.log("Removed favourite:", foodID);
}


async function readFavourites(setFavObjArr) {
    let favObjArr = [];

    await forEachDoc(favsArr, async function (foodID) {
        let snapshotData, foodObj;
        await foodCollection
            .doc(foodID)
            .get()
            .then(doc => {
                snapshotData = doc.data();
            } )
            .then(async () => {
                foodObj = await combineAllData(snapshotData, foodID);
            })
            .then(() => favObjArr.push(foodObj))
            .catch(err => console.error("Error retrieving food doc data:", err));

        // const foodObj = await combineAllData(snapshotData, foodID);
        // favObjArr.push(foodObj);
    });

    setFavObjArr(favObjArr);
}


// custom async forEach function
async function forEachDoc(docs, callback) {
    for (let i = 0; i < docs.length; i++) {
        await callback(docs[i]);
    }
}


export {isFavourite, addFavourite, removeFavourite, readFavourites};

