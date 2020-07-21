import firebaseDB from '../constants/firebaseDB';
import combineAllData from './combineAllData';

const foodCollection = firebaseDB.firestore().collection("FOODS");
const ratingsCollection = firebaseDB.firestore().collection("RATINGS");

// global variable local db snapshot
let localRatingsSnapshot = null;


export default async function getRandomFood(setFood) {

    // if localSnapshot is not initialised, initialise it
    if (localRatingsSnapshot === null) {
        localRatingsSnapshot = await ratingsCollection
            .where('avgRating', '>=', 3)
            .get()
            .catch(err => console.log("Error getting ratings collection:", err));
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
        .then(res => {
            setFood(res);
        })
        .catch(err => console.log('Error setting recommendation:', err));
}

