import * as firebase from "firebase";

const userCollection = firebase.firestore().collection('USERS');

async function createUserDoc(email, number, username) {
    if (firebase.auth().currentUser) {
        await userCollection.doc(username)
            .set({
                username: username,
                contact: number,
                email: email
            })
            .catch(err => console.log('Error creating user doc:', err));
    } else {
        console.log('No current user');
    }
}


async function userNameExists(username) {
    const docRef = userCollection.doc(username);
    const doc = await docRef.get();
    return doc.exists;
}


async function createUser(email, password, number, username, alert) {
    await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
            console.log('Error creating user:', err);
            alert(err.message)
        })
        .then(() => console.log('User created:', email, username))
        .then(() => updateProfile(email, username))
        .then(() => createUserDoc(email, number, username));
}


async function updateProfile(email, username) {
    if (firebase.auth().currentUser) {
        await firebase.auth()
            .currentUser
            .updateProfile({
                displayName: username,
                email: email
            })
            .catch(err => console.log('Error updating displayName:', err));
    } else {
        console.log('No current user');
    }
}

async function signOut() {
    if (firebase.auth().currentUser) {
        await firebase.auth()
            .signOut()
            .catch(err => console.log('Error signing out:', err));
    } else {
        console.log('No current user');
    }
}


async function getUserContact(setUserContact) {
    if (firebase.auth().currentUser) {
        const username = firebase.auth().currentUser.displayName;
        const docRef = firebase.firestore().collection('USERS').doc(username);
        const snapshot = await docRef.get();
        setUserContact(await snapshot.data().contact);
    } else {
        console.log('No current user');
    }
}


export {createUserDoc, userNameExists, createUser, signOut, getUserContact};
