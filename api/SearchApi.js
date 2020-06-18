import firebaseDB from '../constants/firebaseDB';

const storeCollection = firebaseDB.firestore().collection('stores');
const foodCollection = firebaseDB.firestore().collection('foods')


async function combineAllData(foodData) {
    let newData = {
        name: foodData.name,
        price: foodData.price,
        store: {}
    };

    storeCollection
        .doc(foodData.store)
        .get()
        .then(doc => {
                if (doc.exists) {
                    newData.store = doc.data();
                    // console.log('//new: ', newData);
                } else {
                    console.log('Store does not exist: ', foodData.store);
                }
            }
        )
        // .then(console.log("new food data:", newData))
        .catch(err => console.log("Error gertting store data:", err));

    return newData;
}

export async function searchQueryFood(food, setResList, setLoading) {
    let res = []

    foodCollection
        .orderBy('name')
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.map(
                docSnapShot => res.push((docSnapShot.data()))
                // docSnapShot => res.push(combineAllData(docSnapShot.data()))
            );
        })
        .then(() => setResList(res))
        .then(() => setLoading(false))
        .catch(err => console.log('Error getting food data:', err));

}
