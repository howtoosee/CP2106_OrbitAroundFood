import firebase from "firebase";
import combineAllData from "./combineAllData";

const foodCollection = firebase.firestore().collection("FOODS");

export default async function searchQueryFood(searchKey, setResList, filters) {
    // checks if a given foodDoc matches the searchKey
    function matchKeyword(keyword, docData) {
        const cleanKeyword = keyword.toLowerCase().replace(/[^0-9a-z]/gi, "");
        const docFoodName = docData.name
            .toLowerCase()
            .replace(/[^0-9a-z]/gi, "");
        const docStoreName = docData.storeID.toLowerCase().replace(/[^0-9a-z]/gi, '');

        return docFoodName.includes(cleanKeyword)
        || docStoreName.includes(cleanKeyword);
    }

    function matchFilter(filterArr, docData) {
        if (filterArr.length > docData.filterKeywords.length) {
            return false;
        } else {
            let match = true;
            let index = 0;
            while (match && index < filterArr.length) {
                const currFilter = filterArr[index];
                if (!docData.filterKeywords.includes(currFilter)) {
                    match = false;
                }
                index++;
            }
            return match;
        }
    }

    // result array
    let res = [];

    // get query of all food
    const querySnapshot = await foodCollection.orderBy("name").get();
    // console.log("Successfully got query snapshot");

    await forEachDoc(querySnapshot.docs, async function (docSnapShot) {
        const snapshotData = docSnapShot.data();
        // console.log("Snapshot data:", snapshotData);

        if (
            matchKeyword(searchKey, snapshotData) &&
            matchFilter(filters, snapshotData)
        ) {
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
