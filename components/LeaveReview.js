import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, Alert} from 'react-native';

import {writeReviews} from "../api/ReviewsApi";

import {Colors, DefaultStyles, Fonts, firebaseDB} from '../constants';


function LeaveReview({route, navigation}) {

    const foodObj = route.params?.foodObj;

    const user = firebaseDB.auth().currentUser;
    const userID = user ? user.displayName : '';
    const [msgString, setMsgString] = useState('');

    const msgInputHandler = msgStr => setMsgString(msgStr);

    const confirmHandler = () => {
        if (msgString.trim().length === 0) {
            // error msg
            Alert.alert(
                'Error',
                'Comment can not be empty!',
                [
                    {
                        text: 'Dismiss'
                    }
                ]
            );
            console.log("Error, comment string can not be empty!");
        } else if (!user) {
            Alert.alert(
                'Error',
                "Something's wrong with the log in!",
                [
                    {
                        text: 'Dismiss'
                    }
                ]
            );
            console.log("Error, something's wrong with the log in!");
        } else {
            // proper username and msg
            const reviewObj = {
                userID: userID,
                comments: msgString
            }

            writeReviews(foodObj.id, reviewObj)
                .then(() => route.params.onGoBack())
                .then(() => Alert.alert(
                    'Success',
                    "Successfully commented!",
                    [
                        {
                            text: 'Ok',
                            onPress: () => navigation.goBack()
                        }
                    ]
                ))
                .catch(err => console.error("Error writing review:", err));
        }
    }


    return (
        <View style={DefaultStyles.screen}>

            <View style={DefaultStyles.contentContainer}>

                <View style={styles.foodInfoContainer}>

                    <Text style={styles.searchResultKey}>
                        {foodObj.name}
                    </Text>

                    <Text style={styles.searchResultInfo}>
                        {foodObj.price}
                    </Text>

                    <Text style={styles.searchResultInfo}>
                        {foodObj.store.store_name} ({foodObj.store.location})
                    </Text>

                    <Text style={styles.searchResultInfo}>
                        {foodObj.store.open_hours} - {foodObj.store.close_hours} hrs
                    </Text>

                </View>

                <View style={styles.reviewContainer}>

                    <View style={styles.usernameSectionContainer}>
                        <Text style={styles.usernameText}>Reviewing as: {'@' + userID}</Text>
                    </View>

                    <View style={styles.msgSectionContainer}>
                        <Text style={styles.reviewHeaderText}>My comments:</Text>
                        <View style={styles.msgInputContainer}>
                            <TextInput style={styles.textInput}
                                       numberOfLines={8}
                                       placeholder="nice dish!"
                                       onChangeText={msgInputHandler}
                                       value={msgString}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.sendButtonContainer}>
                    <Button title={"Send"}
                            color={Colors.BUTTON}
                            onPress={() => confirmHandler()}
                    />
                </View>

            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    foodInfoContainer: {
        flex: 2,
        paddingVertical: 4,
    },

    searchResultKey: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: "bold",
        paddingBottom: 6,

    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        paddingBottom: 2,
    },

    reviewContainer: {
        flex: 14,
    },

    reviewHeader: {
        paddingTop: 10,
        paddingBottom: 5,
    },

    reviewHeaderText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
    },

    usernameText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
    },

    usernameSectionContainer: {
        paddingTop: 6,
        paddingBottom: 8,
    },

    msgSectionContainer: {
        paddingTop: 10,
    },

    usernameInputContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: Colors.BORDER,
        width: '95%',
    },

    msgInputContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: Colors.BORDER,
        width: '95%',
        height: 100,
    },

    inputText: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
    },

    sendButtonContainer: {
        flex: 2,
    }
})


export default LeaveReview;