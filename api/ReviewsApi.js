import firebase from "firebase";

const reviewsCollection = firebase.firestore().collection("REVIEWS");
const ratingsCollection = firebase.firestore().collection("RATINGS");

const date = new Date();

export async function readReviews(foodObjID, setRating, setReviews) {
    let reviewsArr = [];
    let rating = null;

    const reviewSnapshot = await reviewsCollection
        .where("foodID", "==", foodObjID)
        .orderBy("timestamp", "desc")
        .get();

    await forEachField(reviewSnapshot.docs, async function (docSnapshot) {
        const snapshotData = await docSnapshot.data();
        // console.log("snapshotData:", snapshotData);

        const newDoc = {
            id: snapshotData.id,
            userID: snapshotData.userID,
            comments: snapshotData.comments,
            time: new Date(snapshotData.timestamp)
        };

        // console.log(newDoc);

        reviewsArr.push(newDoc);
    });

    const ratingSnapshot = ratingsCollection.doc(foodObjID);
    const ratingDoc = await ratingSnapshot.get();

    if (ratingDoc.exists) {
        const docData = await ratingDoc.data();
        rating = docData.avgRating.toFixed(2);
    } else {
        rating = "no ratings yet";
    }

    setRating(rating);
    setReviews(reviewsArr);
}

export async function writeReviews(foodObjID, reviewObj) {
    reviewObj.timestamp = date.getTime();
    reviewObj.foodID = foodObjID;

    await reviewsCollection
        .add(reviewObj)
        .catch(err => console.log("Error adding review:", err));

    const ratingSnapshot = ratingsCollection.doc(foodObjID);
    const ratingDoc = await ratingSnapshot.get();

    if (ratingDoc.exists) {
        const docData = await ratingDoc.data();
        const newSumRating = docData.sumRating + reviewObj.rating;
        const newNumRating = docData.numRating + 1;
        const newAvgRating = newSumRating / newNumRating;

        await ratingSnapshot
            .set({
                sumRating: newSumRating,
                numRating: newNumRating,
                avgRating: newAvgRating
            })
            .catch(err => console.log("Error updating rating:", err));
    } else {
        await ratingSnapshot
            .set({
                sumRating: reviewObj.rating,
                numRating: 1,
                avgRating: reviewObj.rating
            })
            .catch(err => console.log("Error updating rating:", err));
    }
}

async function forEachField(doc, callback) {
    for (let i = 0; i < doc.length; i++) {
        await callback(doc[i]);
    }
}
