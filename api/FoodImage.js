import firebase from "firebase";

const storage = firebase.storage();

async function getImage(url, setPhotoUri) {
    const pathRef = storage.refFromURL(url);
    await pathRef.getDownloadURL().then((uri) => setPhotoUri(uri));
}

export default getImage;
