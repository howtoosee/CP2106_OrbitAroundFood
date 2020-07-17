import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import { Fonts, Colors } from '../constants';

function AcceptRequestInput({ navigation, route }) {

    const [enteredContact, setEnteredContact] = useState('');
    const [enteredRemarks, setEnteredRemarks] = useState('');

    const contactInputHandler = (enteredText) => {
        setEnteredContact(enteredText);
    };

    const remarksInputHandler = (enteredText) => {
        setEnteredRemarks(enteredText);
    };

    useEffect(() => {
        if (route.params) {
            // Post updated, do something with `route.params`
        }
    }, [route.params]);

    const confirmRequestHandler = () => {

        if (enteredContact.length == 0) {
            return;
        }

        navigation.navigate(
            'Confirmed Request List', {
            store: route.param?.store,
            open: route.param?.open,
            close: route.param?.close,
            loc: route.params?.loc,
            dest: route.params?.dest,
            date: route.params?.date,
            time: route.params?.time,
            food: route.params?.food,
            price: route.params?.price,
            customerRemarks: route.params?.customerRemarks,
            buyerContact: enteredContact,
            buyerRemarks: enteredRemarks
        });
        setEnteredContact('');
        setEnteredRemarks('');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="Your Contact Number"
                        placeholderTextColor={'grey'}
                        style={styles.textInput}
                        onChangeText={contactInputHandler}
                        value={enteredContact} />
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
                        <Button title="CANCEL" color={Colors.DARKER_BUTTON} onPress={() => navigation.navigate('Lemme Help')} />
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