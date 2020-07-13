import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';

import {writeReviews} from "../api/ReviewsApi";

import Colors from '../constants/Colors';
import DefaultStyles from "../constants/DefaultStyles";

import firebaseDB from '../constants/firebaseDB';


function LeaveReview({route, navigation}) {

    const foodObj = route.params?.foodObj;

    // const [userID, setUserID] = useState('');
    const user = firebaseDB.auth().currentUser;
    console.log(user);
    const userID = user ? user.displayName : '';
    const [msgString, setMsgString] = useState('');

    // const userIDInputHandler = userIDStr => setUserID(userIDStr);
    const msgInputHandler = msgStr => setMsgString(msgStr);

    const confirmHandler = () => {
        if (userID.trim().length === 0) {
            // error msg
            console.error("Error, userID can not be empty!");
        } else if (msgString.trim().length === 0) {
            // error msg
            console.error("Error, comment string can not be empty!");
        } else if (userID === '') {
            console.error("Not signed in!");
        } else {
            // proper username and msg
            const reviewObj = {
                userID: userID,
                comments: msgString
            }

            writeReviews(foodObj.id, reviewObj)
                .then(() => navigation.goBack())
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
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewHeaderText}>
                            Leave a review:
                        </Text>
                    </View>

                    <View style={styles.usernameSectionContainer}>
                        <Text style={styles.usernameText}>Reviewing as: {userID === '' ? 'None' : '@'+userID}</Text>

                        {/*<View style={styles.usernameInputContainer}>*/}

                        {/*    <TextInput style={styles.textInput}*/}
                        {/*               placeholder="your username"*/}
                        {/*               onChangeText={userIDInputHandler}*/}
                        {/*               value={userID}*/}
                        {/*    />*/}

                        {/*</View>*/}

                    </View>

                    <View style={styles.msgSectionContainer}>
                        <Text style={styles.usernameText}>my comments</Text>
                        <View style={styles.msgInputContainer}>
                            <TextInput style={styles.textInput}
                                       // multiline
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
    },

    searchResultKey: {
        color: Colors.TEXT,
        fontSize: 16,
        fontWeight: "bold",
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: 14,
    },

    reviewContainer: {
        flex: 14,
    },

    reviewHeader: {
        paddingTop: 10,
        paddingBottom: 5,
    },

    reviewHeaderText: {
        fontSize: 16,

    },

    usernameText: {
        fontSize: 14,
    },

    usernameSectionContainer: {
        paddingTop: 10,
        paddingBottom: 10,
    },

    msgSectionContainer: {
        paddingTop: 10,
    },

    usernameInputContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'grey',
        width: '95%',
    },

    msgInputContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'grey',
        width: '95%',
        height: 100,
    },

    inputText: {
        fontSize: 16,
    },

    sendButtonContainer: {
        flex: 2,
    }
})


export default LeaveReview;