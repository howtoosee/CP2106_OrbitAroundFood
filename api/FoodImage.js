import firebaseDB from '../constants/firebaseDB';

const storage = firebaseDB.storage();


async function getImage(url, setPhotoUri) {
    const pathRef = storage.refFromURL(url);
    await pathRef.getDownloadURL()
        .then(uri => setPhotoUri(uri));
}


export default getImage;
