import React, {useState} from 'react';
import {
    Alert,
    Button,
    Dimensions,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import {writeReviews} from "../../api/ReviewsApi";
import FoodInfoContainer from "../support-components/FoodInfoContainer";
import DismissKeyboardView from "../support-components/DismissKeyboardView";
import {Colors, DefaultStyles, Fonts} from '../../constants';

import * as firebase from 'firebase';

const {width, height} = Dimensions.get('window');


function LeaveReview({route, navigation}) {

    const foodObj = route.params?.foodObj;

    const user = firebase.auth().currentUser;
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

        <SafeAreaView style={DefaultStyles.screen}>

            <KeyboardAvoidingView style={DefaultStyles.keyboardAvoidScreen}
                                  behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <DismissKeyboardView style={{flex: 1, justifyContent: 'flex-start'}}>

                    <View style={styles.foodInfoContainer}>

                        <FoodInfoContainer
                            item={foodObj}
                            hideButton={true}
                        />

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
                                           placeholder="nice dish! (max 200 chars)"
                                           onChangeText={msgInputHandler}
                                           value={msgString}
                                           multiline={true}
                                           numberOfLines={4}
                                           maxLength={200}
                                           autoCapitalize={'sentences'}
                                           enablesReturnKeyAutomatically={true}
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

                </DismissKeyboardView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    foodInfoContainer: {
        // marginBottom: 10,
        // paddingVertical: 8,
        // paddingLeft: 8,
        // borderWidth: 2,
        // borderRadius: 2,
        width: '100%',
        justifyContent: 'center',
        height: height * 0.16
    },

    reviewContainer: {
        marginTop: '5%',
        marginBottom: '6%',
    },

    reviewTitleContainer: {
        marginTop: '1%',
        marginBottom: '3%',
    },

    reviewTitleText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
    },

    ratingSectionContainer: {
        marginTop: '2%',
        marginBottom: '3%'
    },

    reviewHeaderText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
    },

    ratingContainer: {
        marginVertical: '3%',
        paddingLeft: '1%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    usernameText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
    },

    usernameSectionContainer: {
        paddingTop: '2%',
        paddingBottom: '2%',
    },

    msgSectionContainer: {
        marginTop: '2%',
    },

    msgInputContainer: {
        marginTop: '2%',
        marginHorizontal: '0%',
        paddingVertical: '1%',
        paddingHorizontal: '2%',
        borderWidth: 1,
        borderRadius: 0,
        borderColor: Colors.LIGHT_BORDER,
        height: height * 0.11,
    },

    inputText: {
        alignSelf: 'flex-start',
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        height: '100%',
        width: '100%'
    },

    sendButtonContainer: {
        marginVertical: 20,
    }
})


export default LeaveReview;