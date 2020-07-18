import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Button, Image, Alert} from 'react-native';

import {readReviews} from "../api/ReviewsApi";
import getImage from "../api/FoodImage";
import {isFavourite, addFavourite, removeFavourite} from "../api/FavouritesLogic";

import requireSignInAlert from "./ComponentRequiresSignInAlert";

import {Colors, DefaultStyles, firebaseDB} from "../constants";


function FoodDetails({route, navigation}) {
    const [isLoading, setLoading] = useState(true);

    const foodObj = route.params?.foodObj;
    const [isSaved, setSaved] = useState(isFavourite(foodObj));
    const [reviews, setReviews] = useState(null);
    const [photoUri, setPhotoUri] = useState('');

    const user = firebaseDB.auth().currentUser;

    const addReviewHandler = () => {
        if (user) {
            navigation.navigate("Leave Review",
                {
                    foodObj: foodObj,
                    user: user,
                    onGoBack: () => refresh(),
                }
            );
            setLoading(true);
        } else {
            // setOpenNoSignWarning(true);
            requireSignInAlert('review', navigation);
        }
    }

    const addFavHandler = () => {
        addFavourite(foodObj);
        setSaved(true);
        if (route.params?.onGoBack) {
            route.params?.onGoBack();
        }
    }

    const removeFavHandler = () => {
        removeFavourite(foodObj);
        setSaved(false);
        if (route.params?.onGoBack) {
            route.params?.onGoBack();
        }
    }

    const loadReviews = () => {
        readReviews(foodObj.id, setReviews)
            .catch(err => console.log("Error getting reviews:", err))

            // set image uri
            .then(() => getImage(foodObj.imageURL, setPhotoUri))
            .catch(err => console.log("Error getting image uri:", err))

            // finish loading everything, rerender
            .then(() => setLoading(false));
    }

    const refresh = () => {
        setLoading(true);
        loadReviews();
    }

    useEffect(() => {
        if (isLoading) {
            loadReviews();
        }
    }, [readReviews, foodObj, setReviews, getImage, setPhotoUri, setLoading]);


    return (

        <View style={DefaultStyles.screen}>

            <View style={{flexDirection: 'row'}}>

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

                <View>
                    <Button title={isSaved ? 'Remove' : 'Save'}
                            color={Colors.BUTTON}
                            onPress={isSaved ? removeFavHandler : addFavHandler}
                    />
                </View>

            </View>

            <View style={styles.imageContainer}>
                {(isLoading || photoUri === '')
                    ? <ActivityIndicator size='small' color='black'/>
                    :
                    <Image
                        style={styles.image}
                        source={{uri: photoUri}}
                    />
                }
            </View>

            <View style={styles.reviewResultContainer}>

                {(isLoading && reviews === null)

                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size='small' color='black'/>
                    </View>

                    : reviews.length === 0
                        ? <View style={styles.noResultsContainer}>
                            <Text>
                                No reviews yet.
                            </Text>
                        </View>

                        : <View>
                            <View style={styles.reviewsHeader}>
                                <Text>Reviews:</Text>
                            </View>
                            <ScrollView>
                                {
                                    reviews.map(rev => reviewElement(rev))
                                }

                                <View style={styles.endOfResultsText}>
                                    <Text>No more liao!</Text>
                                </View>

                            </ScrollView>
                        </View>
                }
            </View>

            <View style={styles.addReviewContainer}>
                <Button title={'Lemme comment'}
                        color={Colors.BUTTON}
                        onPress={addReviewHandler}
                />
            </View>
        </View>
    );
}


function reviewElement(rev) {

    const getKey = (name, objType) => name + '_' + objType + '_' + Math.floor(Math.random() * 10000);

    const formatDate = jsDate => jsDate.toDateString();

    return (
        <View style={styles.reviewResultIndivContainer} key={getKey(rev.id, 'scrollView')}>
            <View style={styles.reviewResultKey}>
                <Text>
                    @{rev.userID} said on {formatDate(rev.time)}:
                </Text>
            </View>

            <View style={styles.reviewResultInfo}>
                <Text>
                    {rev.comments}
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    imageContainer: {
        flex: 8,
        paddingTop: 20,
        paddingBottom: 10,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },

    image: {
        width: '90%',
        height: 200,
    },

    foodInfoContainer: {
        flex: 1,
        paddingBottom: 40,
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

    reviewResultContainer: {
        flex: 18,
        overflow: 'hidden',
    },

    addReviewContainer: {
        flex: 3,
    },

    reviewResultIndivContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
// borderColor: Colors.CARD,
        borderColor: 'grey',
        borderRadius: 5,
        width: '98%',
    },

    reviewResultKey: {
        color: Colors.TEXT,
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 2,
    },

    reviewResultInfo: {
        color: Colors.TEXT,
        fontSize: 18,
    },

    reviewsHeader: {
        marginTop: 20,
        marginBottom: 5,
// paddingTop: 10,
        color: Colors.TEXT,
        fontSize: 18,
        fontWeight: "bold",
    },

    loadingContainer: {
        flex: 1,
        paddingBottom: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    noResultsContainer: {
        paddingTop: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },

    endOfResultsText: {
        height: 180,
        paddingVertical: 20,
        fontStyle: 'italic',
        alignItems: 'center',
// justifyContent: 'center'
    },

    boxContainer: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        height: 150,
        width: 320,
        margin: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        paddingBottom: 8,
        backgroundColor: Colors.CARD
    }
});


export default FoodDetails;