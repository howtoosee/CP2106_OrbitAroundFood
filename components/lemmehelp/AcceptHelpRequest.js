import React, {useEffect, useState} from 'react';
import {Alert, Button, SafeAreaView, StyleSheet, TextInput, View, Dimensions} from 'react-native';
import * as firebase from 'firebase';

import {Colors, DefaultStyles, Fonts} from '../../constants';
import {setHelper} from '../../api/HelpApi';
import {getUserContact} from "../../api/AuthenticationApi";
import RequestInfoContainer from "./RequestInfoContainer";
import DismissKeyboardView from "../support-components/DismissKeyboardView";


const {width, height} = Dimensions.get('window');

function AcceptHelpRequest({navigation, route}) {
    const requestObj = route.params?.requestObj;
    const onGoBack = route.params?.onGoBack;

    const {displayName} = firebase.auth().currentUser;

    const [remarks, setRemarks] = useState('');
    const [userContact, setUserContact] = useState('');

    const remarksInputHandler = (enteredText) => {
        setRemarks(enteredText);
    };

    const confirmRequestHandler = () => {
        const helperObj = {
            userId: displayName,
            contact: userContact,
            remark: remarks
        }

        setHelper(requestObj.helpId, helperObj)
            .then(() => {
                Alert.alert('Success',
                    'You have accepted the request!',
                    [{
                        text: 'Ok',
                        onPress: () => {
                            onGoBack();
                            navigation.goBack()
                        },
                    }]
                );
            })
            .catch(err => console.log('Error setting helper:', err))
            .then(setRemarks(''));
    };


    useEffect(() => {
        getUserContact(setUserContact)
            .catch(err => console.log('Error getting user contact:', err));
    }, [getUserContact, setUserContact]);

    return (
        <SafeAreaView style={DefaultStyles.screen}>
            <DismissKeyboardView style={{flex: 1}}>

                <View style={styles.acceptRequestContainer}>
                    <View style={styles.foodInfoContainer}>

                        <RequestInfoContainer item={requestObj}
                                              showButton={false}
                                              status={'helping'}
                        />

                    </View>


                    <View style={styles.textInputContainer}>

                        <TextInput placeholder="Remarks (max 30 chars)"
                                   placeholderTextColor={Colors.TEXT}
                                   style={styles.textInput}
                                   onChangeText={remarksInputHandler}
                                   value={remarks}
                                   maxLength={30}
                        />

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
                                    onPress={confirmRequestHandler}
                            />
                        </View>

                    </View>

                </View>

            </DismissKeyboardView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    acceptRequestContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        // borderWidth: 1,

    },

    foodInfoContainer: {
        flex: 4,
        width: '100%',
        // borderWidth: 1,
    },

    textInputContainer: {
        flex: 5,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    textInput: {
        width: '98%',
        borderColor: Colors.LIGHT_BORDER,
        borderBottomWidth: 2,
        fontSize: Fonts.S,
        paddingVertical: 0.01 * height,
        paddingHorizontal: 0.015 * width,
    },

    buttonContainer: {
        flex: 1,
        width: '90%',
        flexDirection: "row",
        justifyContent: 'center',
        // borderWidth: 1,
    },

    confirmButton: {
        flex: 1,
        width: '100%',
    },

    cancelButton: {
        flex: 1,
        width: '100%',
    }
});

export default AcceptHelpRequest;

