import firebaseDB from '../constants/firebaseDB';

const storeCollection = firebaseDB.firestore().collection('stores');
const foodCollection = firebaseDB.firestore().collection('foods')


async function combineAllData(foodData) {
    // template for newData
    let newData = {
        name: foodData.name,
        price: '$' + foodData.price.toPrecision(2),
    };

    await storeCollection
        .doc(foodData.store) // access doc (docID of store = foodData.store)
        .get()
        .then(docSnapShot => {
            if (docSnapShot.exists) {
                // update newData
                newData.store = docSnapShot.data();
            } else {
                console.log('Store does not exist: ', foodData.store);
            }
        })
        .catch(err => console.log("Error getting store data:", err));

    return newData;

}


export default async function searchQueryFood(searchKey, setResList, setLoading) {

    // custom async forEach function
    async function forEachDoc(docs, callback) {
        for (let i = 0; i < docs.length; i++) {
            await callback(docs[i]);
        }
    }


    // checks if a given foodDoc matches the searchKey
    function matchKeyword(keyword, docData) {
        const lowerCaseKw = keyword.toLowerCase();
        const docFoodName = docData.name.toLowerCase();
        const docStoreName = docData.store.toLowerCase();
        return docFoodName.includes(lowerCaseKw) || docStoreName.includes(lowerCaseKw);
    }


    // result array
    let res = []

    try {
        // get query of all food
        const querySnapshot = await foodCollection.orderBy('name').get();

        await forEachDoc(querySnapshot.docs, async function (docSnapShot) {
            const snapshotData = await docSnapShot.data();
            // console.log(snapshotData);

            if (matchKeyword(searchKey, snapshotData)) {
                const newData = await combineAllData(snapshotData);

                if (newData !== null) {
                    // if newData exists, include it in the results
                    res.push(newData);
                }
            }
        });

        // console.log("Results:", res)
        // console.log("number of results:", res.length)
        setResList(res)
        setLoading(false)
    } catch (err) {
        console.log('Error getting food data:', err);
    }

}


