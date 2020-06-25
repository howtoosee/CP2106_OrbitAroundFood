import firebaseDB from '../constants/firebaseDB';
import combineAllData from './combineAllData';

const foodCollection = firebaseDB.firestore().collection("FOODS");


export default async function searchQueryFood(searchKey, setResList) {

    // checks if a given foodDoc matches the searchKey
    function matchKeyword(keyword, docData) {
        const cleanKeyword = keyword.toLowerCase().replace(/[^0-9a-z]/gi, '')
        const docFoodName = docData.name.toLowerCase().replace(/[^0-9a-z]/gi, '');
        const docStoreName = docData.storeID.toLowerCase().replace(/[^0-9a-z]/gi, '');

        return (
            docFoodName.includes(cleanKeyword) ||
            docStoreName.includes(cleanKeyword)
        );
    }

    // result array
    let res = [];

    // get query of all food
    const querySnapshot = await foodCollection.orderBy("name").get();
    // console.log("Successfully got query snapshot");


    await forEachDoc(querySnapshot.docs, async function (docSnapShot) {
        const snapshotData = docSnapShot.data();
        // console.log("Snapshot data:", snapshotData);

        if (matchKeyword(searchKey, snapshotData)) {
            const newData = await combineAllData(snapshotData, docSnapShot.id);
            // console.log("Combined data:", newData);

            if (newData !== null) {
                // if newData exists, include it in the results
                res.push(newData);
            }
        }
    });

    // console.log("Results:", res)
    // console.log("number of results:", res.length)
    setResList(res);
}


// custom async forEach function
async function forEachDoc(docs, callback) {
    for (let i = 0; i < docs.length; i++) {
        await callback(docs[i]);
    }
}

