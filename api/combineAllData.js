import * as firebase from 'firebase';

const storeCollection = firebase.firestore().collection("STORES");

export default async function combineAllData(foodData, id) {
    // template for newData
    let newData = {
        id: id,
        name: foodData.name,
        price: isNaN(foodData.price)
            ? "not available"
            : "$" + foodData.price.toFixed(2),
        storeID: foodData.storeID,
        imageURL: foodData.imageURL
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
        .catch(err => console.log("Error getting store data:", err));

    return newData;
}
