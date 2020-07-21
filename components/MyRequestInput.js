import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Text } from 'react-native';

import { Fonts, Colors } from '../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { writeHelp } from '../api/HelpApi';
import * as firebase from 'firebase';

function MyRequestInput({ navigation, route }) {

    // Date and Time Picker
    const today = new Date();
    const timestamp = today.getTime();
    const [date, setDate] = useState(today);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fixedDate, setFixedDate] = useState(moment(today).format('Do MMM'));
    const [fixedTime, setFixedTime] = useState('12:00');

    const onChangeTiming = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setFixedDate(moment(date).format('Do MMM'));
        setFixedTime(moment(date).format('HH:mm'));
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    // Additional Inputs
    const [enteredDestination, setEnteredDestination] = useState('');
    const [enteredRemarks, setEnteredRemarks] = useState('');

    const destinationInputHandler = (enteredText) => {
        setEnteredDestination(enteredText);
    }

    const remarksInputHandler = (enteredText) => {
        setEnteredRemarks(enteredText);
    }

    // Link to database
    const { displayName } = firebase.auth().currentUser;
    const foodObj = route.params?.foodObj;
    const [userContact, setUserContact] = useState('');

    async function getUserContact() {
        const usersRef = firebase.firestore().collection('USERS').doc(displayName);
        const snapshot = await usersRef.get();
        if (!snapshot.exists) {
            console.log('No matching documents.');
        } else {
            const contact = await snapshot.data().contact;
            setUserContact(contact);
        }
    }



    useEffect(() => {
        if (route.params) {
            // Post updated, do something with `route.params`
            getUserContact()
                .catch(err => console.log('Error getting user contact:', err));
        }
    }, [route.params]);

    
    const confirmHelpHandler = () => {
        const onGoBack = route.params?.onGoBack;
        
        if (enteredDestination.length == 0 || enteredRemarks == 0) {
            return;
        }

        const userObj = {
            userId: displayName,
            contact: userContact,
            location: enteredDestination,
            askerRemark: enteredRemarks
        };

        const timeObj = {
            estTime: fixedTime,
            date: fixedDate,
            time: today,
            timestamp: timestamp
        }

        writeHelp(foodObj.id, userObj, timeObj);

        onGoBack();
        navigation.navigate('Help Buy Pls', {});
        setEnteredDestination('');
        setEnteredRemarks('');

    }

    return (
        <View style={styles.screen}>
            <View style={styles.searchResultContainer}>
                <View style={styles.searchResultInfoContainer}>
                    <Text style={styles.searchResultKey}>Food: {foodObj.name}</Text>
                    <Text style={styles.searchResultKey}>Price: {foodObj.price}</Text>
                    <Text style={styles.searchResultKey}>Operating hours: {foodObj.store.open_hours} - {foodObj.store.close_hours}</Text>
                    <Text style={styles.searchResultKey}>Stall: {foodObj.store.store_name}</Text>
                    <Text style={styles.searchResultKey}>Location: {foodObj.store.location}</Text>
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder="Meeting Place"
                    placeholderTextColor={'grey'}
                    style={styles.textInput}
                    onChangeText={destinationInputHandler}
                    value={enteredDestination} />
                <TextInput
                    placeholder="Remarks"
                    placeholderTextColor={'grey'}
                    style={styles.textInput}
                    onChangeText={remarksInputHandler}
                    value={enteredRemarks} />
            </View>
            <View style={styles.dateTimeContainer}>
                <View style={styles.dateTimePicker}>
                    <TouchableOpacity style={styles.dateTimeButton} onPress={showTimepicker}>
                        <Text style={styles.dateTimeText}> Select Estimated Time of Food Arrival </Text>
                    </TouchableOpacity>
                </View>
                {
                    show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChangeTiming}
                        />)
                }
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerText}>Date of Food Request: {fixedDate} </Text>
                    <Text style={styles.pickerText}>Time of Arrival: {fixedTime}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.confirmButton}>
                    <Button title="CONFIRM" color={Colors.ALT_BUTTON} onPress={confirmHelpHandler} />
                </View>
                <View style={styles.cancelButton}>
                    <Button title="CANCEL" color={Colors.DARKER_BUTTON} onPress={() => navigation.goBack()} />
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },

    searchResultContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.TEXT,
        borderRadius: 4,
        width: '97%',
        color: Colors.TEXT,
        flexDirection: 'row',
    },

    searchResultKey: {
        color: Colors.TEXT,
        fontSize: 16,
        fontWeight: "bold",
    },

    searchResultInfoContainer: {
        // flex: 1,
        justifyContent: 'center'
    },

    dateTimeContainer: {
        // flex: 1
        paddingTop: 10,
        alignItems: 'center',
    },

    dateTimePicker: {
        paddingTop: 5,

    },

    dateTimeButton: {
        backgroundColor: Colors.ALT_BUTTON,
        borderColor: Colors.DARKER_BUTTON,
        borderWidth: 3,
        borderRadius: 30,
        color: Colors.TEXT,
        padding: 12
    },

    dateTimeText: {
        color: 'white',
        fontSize: Fonts.S,
        fontWeight: "700",
        alignItems: 'center',
        justifyContent: 'center'
    },

    pickerContainer: {
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    pickerText: {
        fontSize: Fonts.S,
    },

    textInputContainer: {
        // flex: 2,
        paddingTop: 20,
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
        backgroundColor: Colors.CARD,
    },

    buttonContainer: {
        flexDirection: "row",
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    confirmButton: {
        width: '40%',
        paddingRight: 15
    },
    
    cancelButton: {
        width: '35%'
    }
});

export default MyRequestInput;