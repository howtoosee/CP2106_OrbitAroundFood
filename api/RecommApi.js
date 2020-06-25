import firebaseDB from '../constants/firebaseDB';
import combineAllData from "./combineAllData";

const foodCollection = firebaseDB.firestore().collection("FOODS");

// global variable local db snapshot
var localSnapshot = null;

export default async function getRandomFood(setLoading, setFood) {

    // if localSnapshot is not initialised, initialise it
    if (localSnapshot === null) {
        localSnapshot = await foodCollection.get();
        // console.log("QUERYING DB");
    }

    const querySnapshot = localSnapshot;

    // generate random index
    const index = Math.floor(Math.random() * querySnapshot.docs.length);

    // get food snap shot
    const foodSnapshot = querySnapshot.docs[index];

    // get food json object
    const foodObj = await foodSnapshot.data();

    // combine food object with store object
    const combinedFoodObj = await combineAllData(foodObj, foodSnapshot.id);

    // console.log(combinedFoodObj);

    // update states
    setLoading(false);
    setFood(combinedFoodObj);

}

