import firebaseDB from '../constants/firebaseDB';

const reviewsCollection = firebaseDB.firestore().collection("REVIEWS");

const date = new Date();


export async function readReviews(foodObjID, setReviews) {

    let reviewsArr = [];

    const snapshot = await reviewsCollection.where('foodID', '==', foodObjID).get();

    await forEachField(snapshot.docs, async function (docSnapshot) {

        const snapshotData = await docSnapshot.data()
        // console.log("snapshotData:", snapshotData);

        const newDoc = {
            id: snapshotData.id,
            userID: snapshotData.userID,
            comments: snapshotData.comments,
            time: new Date(snapshotData.timestamp)
        }

        // console.log(newDoc);

        reviewsArr.push(newDoc);

    });

    setReviews(reviewsArr);

}


export async function writeReviews(foodObjID, reviewObj) {

    const genReviewID = (timestamp, userID) => timestamp + '_@' + userID;

    const time = date.getTime();

    const id = genReviewID(time, reviewObj.userID);
    reviewObj.timestamp = time;
    reviewObj.foodID = foodObjID;

    // console.log("Writing new review obj:", id, reviewObj);

    await reviewsCollection.doc(id).set(reviewObj);

}


async function forEachField(doc, callback) {
    for (let i = 0; i < doc.length; i++) {
        await callback(doc[i]);
    }
}