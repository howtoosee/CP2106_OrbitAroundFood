import firebase_admin
from firebase_admin import credentials, firestore

def InitializeDB():
    cred = credentials.Certificate("./adminSDK.json")
    firebase_admin.initialize_app(cred)

    db = firestore.client()
    return db