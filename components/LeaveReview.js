import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, Alert} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {writeReviews} from "../api/ReviewsApi";

import {Colors, DefaultStyles, Fonts, firebaseDB} from '../constants';


function LeaveReview({route, navigation}) {

    const foodObj = route.params?.foodObj;

    const user = firebaseDB.auth().currentUser;
    const userID = user ? user.displayName : '';
    const [rating, setRating] = useState(3);
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
                rating: rating,
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

                <View style={styles.reviewTitleContainer}>
                    <Text style={styles.reviewTitleText}>LemmeReview:</Text>
                </View>

                <View style={styles.ratingSectionContainer}>
                    <Text style={styles.reviewHeaderText}>{'@' + userID}'s rating:</Text>
                    <View style={styles.ratingContainer}>
                    <AirbnbRating
                        selectedColor={Colors.DARKER_BUTTON}
                        reviewColor={Colors.DARKER_BUTTON}
                        size={30}
                        count={5}
                        defaultRating={rating}
                        showRating={false}
                        onFinishRating={setRating}
                    />
                    </View>

                </View>

                <View style={styles.msgSectionContainer}>
                    <Text style={styles.reviewHeaderText}>{'@' + userID}'s comments:</Text>
                    <View style={styles.msgInputContainer}>
                        <TextInput style={styles.inputText}
                                   numberOfLines={10}
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
    );

}

const styles = StyleSheet.create({
    foodInfoContainer: {
        marginBottom: 10,
        paddingVertical: 8,
        paddingLeft: 8,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: Colors.LIGHT_BORDER,
        justifyContent: 'center',
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
        marginTop: 20,
        marginBottom: 30,
    },

    reviewTitleContainer: {
        marginTop: 4,
        marginBottom: 10,
    },

    reviewTitleText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
    },

    ratingSectionContainer: {
        marginTop: 8,
    },

    reviewHeaderText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
    },

    ratingContainer: {
        marginVertical: 10,
        paddingLeft: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        marginTop: 8,
    },

    msgInputContainer: {
        marginTop: 8,
        padding: 8,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.BORDER,
        height: 150,
    },

    inputText: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
    },

    sendButtonContainer: {
        marginVertical: 20,
    }
})


export default LeaveReview;