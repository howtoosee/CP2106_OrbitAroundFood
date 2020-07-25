import React, {useEffect, useState} from 'react';
import {Alert, Button, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button as ButtonRNE} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as firebase from 'firebase';

import {getUserContact} from '../../api/AuthenticationApi';
import {writeHelp} from '../../api/HelpApi';
import {Colors, DefaultStyles, Fonts} from '../../constants';
import FoodInfoContainer from '../support-components/FoodInfoContainer';
import DismissKeyboardView from "../support-components/DismissKeyboardView";

const {width, height} = Dimensions.get('window');


function CreateRequest({navigation, route}) {

    const {displayName} = firebase.auth().currentUser;
    const foodObj = route.params?.foodObj;
    const onGoBack = ('onGoBack' in route.params) ? route.params.onGoBack : () => null;

    const [destination, setDestination] = useState('');
    const [remarks, setRemarks] = useState('');
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [timeETA, setTimeETA] = useState('-not set yet-');
    const [timeStamp, setTimeStamp] = useState(null);

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

        if (dateObj < Date.now()) {
            Alert.alert('Error',
                'Time cannot be in the past!',
                [{text: 'Dismiss'}]
            );
        } else {
            setTimeETA(timeString);
            setTimeStamp(dateObj);
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
        } else if (timeStamp < Date.now()) {
            Alert.alert('Error',
                'Time cannot be in the past!',
                [{text: 'Dismiss'}]
            );
        } else {

            const userObj = {
                userId: displayName,
                contact: userContact,
                location: destination,
                askerRemark: remarks
            };

            const timeObj = {
                timeETA: timeETA,
                timestamp: Date.now(),
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
            .catch(err => console.log('Error getting user contact:', err));
    }, [getUserContact]);


    return (
        <SafeAreaView style={DefaultStyles.screen}>
            <DismissKeyboardView style={{flex: 1}}>

                <DateTimePickerModal isVisible={showTimePicker}
                                     mode='time'
                                     date={timeStamp === null ? new Date() : timeStamp}
                                     onConfirm={confirmTimeHandler}
                                     onCancel={hideTimePicker}
                                     headerTextIOS={'Select time to meet:'}
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
                                       placeholder="Where to meet?"
                                       onChangeText={destinationInputHandler}
                                       value={destination}
                            />

                        </View>

                        <View style={styles.textInputContainer}>

                            <Text style={styles.inputHeaderText}>Remarks</Text>
                            <TextInput style={styles.textInput}
                                       numberOfLines={1}
                                       placeholder="Remarks (max 30 chars)"
                                       onChangeText={remarksInputHandler}
                                       value={remarks}
                                       maxLength={30}
                            />

                        </View>
                    </View>
                </View>

                <View style={styles.dateTimeContainer}>

                    <View style={styles.dateTimeStatsContainer}>
                        <Text style={styles.dateTimeStatsText}>Time to Meet:</Text>
                        <Text style={styles.dateTimeText}>{timeETA}</Text>
                    </View>


                    <View style={styles.timePickerButtonContainer}>
                        <ButtonRNE title='Select Time to Meet'
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

            </DismissKeyboardView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({

    foodInfoContainer: {
        // flex: 2,
        // marginBottom: '1%',
        height: height * 0.16,
    },

    dateTimeContainer: {
        // flex: 2,
        marginBottom: '3%',
        alignItems: 'center',
    },

    dateTimePicker: {
        marginVertical: '5%',
    },

    timePickerButtonContainer: {
        width: '75%',
        marginTop: '3%',
        marginBottom: '5%',
    },

    timePickerButton: {
        backgroundColor: Colors.BUTTON,
    },

    dateTimeStatsContainer: {
        marginTop: '2%',
        marginBottom: '3%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    dateTimeStatsText: {
        paddingVertical: '2%',
        fontSize: Fonts.S,
        fontWeight: 'bold',
        color: Colors.DARK_TEXT
    },

    dateTimeText: {
        paddingVertical: '2%',
        fontSize: Fonts.M,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: Colors.TEXT
    },

    requestInfoContainer: {
        marginVertical: '5%',
    },

    requestInfoHeaderContainer: {
        marginBottom: '3%',
    },

    requestInfoHeaderText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
        fontWeight: 'bold'
    },

    textInputContainer: {
        // flex: 4,
        marginBottom: '3%',
        marginHorizontal: '0.3%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },

    inputHeaderText: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingTop: '3%',
        paddingBottom: '0%',
    },

    textInput: {
        width: '100%',
        borderColor: Colors.BORDER,
        // borderWidth: 1,
        borderBottomWidth: 2,
        // borderRadius: 4,
        fontSize: Fonts.S,
        paddingVertical: 6,
        paddingHorizontal: 4,
        marginVertical: 8,
    },

    buttonContainer: {
        // flex: 2,
        width: '90%',
        paddingTop: '3%',
        flexDirection: "row",
        justifyContent: 'center',
        alignSelf: 'center',
    },

    confirmButton: {
        flex: 1,
    },

    cancelButton: {
        flex: 1,
    }
});

export default CreateRequest;