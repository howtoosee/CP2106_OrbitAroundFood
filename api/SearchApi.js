import firebaseDB from '../constants/firebaseDB';


export async function searchQueryFood(food, setResList, setLoading) {

    let snapshot = await firebaseDB.firestore()
        .collection('foods')
        .where('foodName', '==', {food})
        .orderBy('foodName')
        .get()
        .catch(error => console.log(error));


    let foodList = [];

    snapshot.forEach((doc) => {
        foodList.push(doc.data());
    });


    setResList(foodList);
    setLoading(false);
}
