import firebaseDB from "../constants/firebaseDB";

const storeCollection = firebaseDB.firestore().collection("STORES");
const foodCollection = firebaseDB.firestore().collection("FOODS");


async function combineAllData(foodData, id) {
    // template for newData
    let newData = {
        id: id,
        name: foodData.name,
        price: isNaN(foodData.price)
            ? 'not available'
            : '$' + foodData.price.toFixed(2),
        storeID: foodData.storeID
    };

    await storeCollection
        .doc(foodData.storeID) // access doc (docID of store = foodData.store)
        .get()
        .then((docSnapShot) => {
            if (docSnapShot.exists) {
                // update newData
                newData.store = docSnapShot.data();
                // console.log(newData);
            } else {
                console.log("Store does not exist: ", foodData.store);
            }
        })
        .catch((err) => console.log("Error getting store data:", err));

    return newData;
}


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

