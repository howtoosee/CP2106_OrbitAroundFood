import * as firebase from 'firebase';
import combineAllData from "./combineAllData";

const foodCollection = firebase.firestore().collection("FOODS");
const ratingsCollection = firebase.firestore().collection("RATINGS");

// global variable local db snapshot
let localRatingsSnapshot = null;

export default async function getRandomFood(setFood) {
    // if localSnapshot is not initialised, initialise it
    if (localRatingsSnapshot === null) {
        localRatingsSnapshot = await ratingsCollection
            .where("avgRating", ">=", 3)
            .get()
            .catch((err) =>
                console.log("Error getting ratings collection:", err)
            );
    }

    const queryRatingSnapshot = localRatingsSnapshot;

    // generate random index
    const index = Math.floor(Math.random() * queryRatingSnapshot.docs.length);

    // get foodId (RatingDoc's ID = corresponding foodID)
    const foodId = queryRatingSnapshot.docs[index].id;

    // get food json object
    const foodDoc = await foodCollection.doc(foodId).get();
    const foodObj = foodDoc.data();

    // combine food object with store object
    await combineAllData(foodObj, foodId)
        .then(res => setFood(res))
        .then(() => console.log('Fetched recommendation'))
        .catch(err => console.log("Error setting recommendation:", err));
}
