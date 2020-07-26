import * as firebase from 'firebase';

const storage = firebase.storage();

async function getImage(url, setPhotoUri) {
    const pathRef = storage.refFromURL(url);
    await pathRef.getDownloadURL()
        .then((uri) => setPhotoUri(uri))
        .then(() => console.log('Fetched photo uri for:', url))
        .catch(err => console.log('Error fetching photo uri for', url, err));
}

export default getImage;
