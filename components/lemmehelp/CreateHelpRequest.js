import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, SafeAreaView, Text, Alert, Platform} from 'react-native';
import {Button as ButtonRNE} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as firebase from 'firebase';
import {getUserContact} from '../../api/AuthenticationApi';


import {Fonts, Colors, DefaultStyles} from '../../constants';
import {writeHelp} from '../../api/HelpApi';
import FoodInfoContainer from '../support-components/FoodInfoContainer';

const today = new Date();


function CreateHelpRequest({navigation, route}) {

    const {displayName} = firebase.auth().currentUser;
    const foodObj = route.params?.foodObj;
    const onGoBack = route.params?.onGoBack;

    const [destination, setDestination] = useState('');
    const [remarks, setRemarks] = useState('');
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [timeETA, setTimeETA] = useState('Not set yet');
    const [userContact, setUserContact] = useState();

    const destinationInputHandler = (dest) => {
        setDestination(dest);
    }

    const remarksInputHandler = (remarks) => {
        setRemarks(remarks);
    }

    const showTimepicker = () => {
        setTimePickerVisible(true);
    }

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    }

    const confirmTimeHandler = (dateObj) => {
        const hr24 = dateObj.getHours();
        const hr = hr24 % 12;
        const min = ('0' + dateObj.getMinutes()).slice(-2);
        const ampm = hr24 > 12 ? 'pm' : 'am';
        const timeString = hr + ':' + min + ' ' + ampm;
        if (dateObj < today.getTime()) {
            Alert.alert('Error',
                'Time cannot be in the past!',
                [{text: 'Dismiss'}]
            );
        } else {
            setTimeETA(timeString);
            hideTimePicker();
        }
    }

    const confirmHelpHandler = () => {
        if (destination.length === 0) {
            Alert.alert('Missing Information',
                'Please enter a meeting place!',
                [{
                    text: 'Dismiss'
                }]);
        } else if (timeETA === "Not set yet") {
            Alert.alert('Missing Information',
                'Please choose a time!',
                [{
                    text: 'Dismiss'
                }]);
        } else {

            const userObj = {
                userId: displayName,
                contact: userContact,
                location: destination,
                askerRemark: remarks
            };

            const timeObj = {
                timeETA: timeETA,
                timestamp: today.getTime(),
            }

            writeHelp(foodObj.id, userObj, timeObj)
                .catch(err => console.log('Error creating new request:', err))
                .then(() => {
                    Alert.alert('Success',
                        'Successfully created new request!',
                        [{
                            text: 'Okay',
                            onPress: () => {
                                onGoBack();
                                setDestination('');
                                setRemarks('');
                                navigation.navigate('Lemme Help');
                            }
                        }]
                    );
                });
        }
    }

    useEffect(() => {
        getUserContact(setUserContact)
            .catch(err => console.log(err));
    }, [getUserContact]);


    return (
        <SafeAreaView style={DefaultStyles.screen}>
            <DateTimePickerModal isVisible={showTimePicker}
                                 mode='time'
                                 date={today}
                                 onConfirm={confirmTimeHandler}
                                 onCancel={hideTimePicker}
            />

            <View style={styles.foodInfoContainer}>
                <FoodInfoContainer
                    item={foodObj}
                    hideButton={true}
                />
            </View>

            <View style={styles.requestInfoContainer}>

                <View style={styles.requestInfoHeaderContainer}>
                    <Text style={styles.requestInfoHeaderText}>Enter your details:</Text>
                </View>

                <View style={styles.textInputContainer}>

                    <View style={styles.textInputContainer}>

                        <Text style={styles.inputHeaderText}>Destination</Text>
                        <TextInput style={styles.textInput}
                                   numberOfLines={1}
                                   placeholder="Meeting place"
                                   placeholderTextColor={'grey'}
                                   onChangeText={destinationInputHandler}
                                   value={destination}
                        />

                    </View>

                    <View style={styles.textInputContainer}>

                        <Text style={styles.inputHeaderText}>Remarks</Text>
                        <TextInput style={styles.textInput}
                                   numberOfLines={1}
                                   placeholder="Remarks"
                                   placeholderTextColor={'grey'}
                                   onChangeText={remarksInputHandler}
                                   value={remarks}
                        />

                    </View>
                </View>
            </View>

            <View style={styles.dateTimeContainer}>

                <View style={styles.dateTimeStatsContainer}>
                    <Text style={styles.dateTimeStatsText}>Time of Arrival:</Text>
                    <Text style={styles.dateTimeText}>{timeETA}</Text>
                </View>


                <View style={styles.timePickerButtonContainer}>
                    <ButtonRNE title='Select Food ETA'
                               type='solid'
                               raised
                               buttonStyle={styles.timePickerButton}
                               onPress={showTimepicker}
                    />
                </View>


            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.cancelButton}>
                    <Button title="CANCEL"
                            color={Colors.BUTTON}
                            onPress={() => navigation.goBack()}
                    />
                </View>

                <View style={styles.confirmButton}>
                    <Button title="CONFIRM"
                            color={Colors.DARKER_BUTTON}
                            onPress={confirmHelpHandler}
                    />
                </View>
            </View>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({

    foodInfoContainer: {
        // flex: 2,
        marginBottom: 10,
    },

    dateTimeContainer: {
        // flex: 2,
        marginBottom: 10,
        alignItems: 'center',
    },

    dateTimePicker: {
        marginVertical: 20,
    },

    timePickerButtonContainer: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },

    timePickerButton: {
        backgroundColor: Colors.BUTTON,
    },

    dateTimeStatsContainer: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dateTimeStatsText: {
        paddingVertical: 5,
        fontSize: Fonts.S,
        fontWeight: 'bold',
        color: Colors.DARK_TEXT
    },

    dateTimeText: {
        paddingVertical: 5,
        fontSize: Fonts.M,
        fontWeight: 'bold',
        color: Colors.TEXT
    },

    requestInfoContainer: {
        marginVertical: 20,
    },

    requestInfoHeaderContainer: {
        marginBottom: 10,
    },

    requestInfoHeaderText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
        fontWeight: 'bold'
    },

    textInputContainer: {
        // flex: 4,
        marginBottom: 10,
        // width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },

    inputHeaderText: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 0,
    },

    textInput: {
        width: '100%',
        borderColor: Colors.BORDER,
        // borderWidth: 1,
        borderBottomWidth: 2,
        // borderRadius: 4,
        fontSize: Fonts.S,
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginVertical: 8,
    },

    buttonContainer: {
        // flex: 2,
        flexDirection: "row",
        paddingTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    confirmButton: {
        flex: 1,
    },

    cancelButton: {
        flex: 1,
    }
});

export default CreateHelpRequest;