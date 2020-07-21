import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import { Fonts, Colors } from '../constants';
import { setHelper } from '../api/HelpApi';
import * as firebase from 'firebase';

function AcceptRequestInput({ navigation, route }) {

    const [enteredRemarks, setEnteredRemarks] = useState('');

    const remarksInputHandler = (enteredText) => {
        setEnteredRemarks(enteredText);
    };

    // Link to database
    const { displayName } = firebase.auth().currentUser;
    const requestObj = route.params?.requestObj;
    const [userContact, setUserContact] = useState('');

    async function getUserContact() {

        const usersRef = firebase.firestore().collection('USERS').doc(displayName);
        const snapshot = await usersRef.get();

        if (!snapshot.exists) {
            console.log('No matching documents.');
        } else {
            const getUserContact = await snapshot.data().contact;
            await setUserContact(getUserContact);
        }
        
    }
    getUserContact();

    useEffect(() => {
        if (route.params) {
            // Post updated, do something with `route.params`
        }
    }, [route.params]);

    const confirmRequestHandler = () => {

        if (enteredRemarks.length == 0) {
            return;
        }

        const helperObj = {
            Id: displayName,
            contact: userContact,
            remark: enteredRemarks
        }
        setHelper(requestObj.helpId, helperObj);
        setEnteredRemarks('');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="Remarks"
                        placeholderTextColor={'grey'}
                        style={styles.textInput}
                        onChangeText={remarksInputHandler}
                        value={enteredRemarks} />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.confirmButton}>
                        <Button title="CONFIRM" color={Colors.ALT_BUTTON} onPress={confirmRequestHandler} />
                    </View>
                    <View style={styles.cancelButton}>
                        <Button title="CANCEL" color={Colors.DARKER_BUTTON} onPress={() => navigation.goBack()} />
                    </View>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInputContainer: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInput: {
        width: '100%',
        height: 50,
        borderColor: 'black',
        borderWidth: 3,
        fontSize: Fonts.S,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: Colors.CARD
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        paddingTop: 20
    },

    confirmButton: {
        width: '35%',
        paddingRight: 15
    },
    
    cancelButton: {
        width: '35%',
        paddingRight: 15
    }
});

export default AcceptRequestInput;