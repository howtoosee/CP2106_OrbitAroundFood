import firebaseDB from '../constants/firebaseDB';

import combineAllData from "./combineAllData";

const foodCollection = firebaseDB.firestore().collection("FOODS");


export default async function getRandomFood(setLoading, setFood) {

    const querySnapshot = await foodCollection.get();

    const index = Math.floor(Math.random() * querySnapshot.docs.length);

    const foodSnapshot = querySnapshot.docs[index];

    const foodObj = await foodSnapshot.data();

    const combinedFoodObj = await combineAllData(foodObj, foodSnapshot.id);

    console.log(combinedFoodObj);

    setLoading(false);
    setFood(combinedFoodObj);
}

