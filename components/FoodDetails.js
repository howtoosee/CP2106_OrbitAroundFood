import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Button, Image, Alert} from 'react-native';

import {readReviews} from "../api/ReviewsApi";
import getImage from "../api/FoodImage";
import {isFavourite, addFavourite, removeFavourite} from "../api/FavouritesLogic";

import requireSignInAlert from "./ComponentRequiresSignInAlert";

import {Colors, DefaultStyles, Fonts, firebaseDB} from "../constants";


function FoodDetails({route, navigation}) {
    const [isLoading, setLoading] = useState(true);

    const foodObj = route.params?.foodObj;
    const [isSaved, setSaved] = useState(isFavourite(foodObj));
    const [rating, setRating] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [photoUri, setPhotoUri] = useState('');

    const [user, setUser] = useState(firebaseDB.auth().currentUser);

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

    const favAlert = favState => {
        Alert.alert('Success',
            'Successfully ' + favState + ' favourite!',
            [
                {
                    text: 'Dismiss',
                    color: Colors.BUTTON
                }
            ]
        );
    }

    const addFavHandler = () => {
        addFavourite(foodObj);
        setSaved(true);
        if (route.params?.onGoBack) {
            route.params?.onGoBack();
        }
        favAlert('added');
    }

    const removeFavHandler = () => {
        removeFavourite(foodObj);
        setSaved(false);
        if (route.params?.onGoBack) {
            route.params?.onGoBack();
        }
        favAlert('removed');
    }

    const loadReviews = () => {
        readReviews(foodObj.id, setRating, setReviews)
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

        return firebaseDB.auth().onAuthStateChanged(() => {
            setUser(firebaseDB.auth().currentUser);
        });
    }, [readReviews, foodObj, setReviews, getImage, setPhotoUri, setLoading]);


    return (

        <View style={DefaultStyles.screen}>

            <View style={styles.foodSectionContainer}>

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

                <View style={styles.favButtonContainer}>
                    <Button title={isSaved ? 'Del' : 'Fav'}
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
                                <Text>Rating: {rating}</Text>
                                <Text style={styles.reviewsHeaderText}>Reviews:</Text>
                            </View>
                            <ScrollView style={{overflow: 'hidden'}}>
                                {
                                    reviews.map(rev => reviewElement(rev))
                                }

                                <View style={styles.endOfResultsTextContainer}>
                                    <Text style={styles.endOfResultsText}>No more liao!</Text>
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
            <Text style={styles.reviewResultKey}>
                @{rev.userID} on {formatDate(rev.time)}:
            </Text>

            <Text style={styles.reviewResultInfo}>
                {rev.comments}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({

    imageContainer: {
        flex: 8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'visible',
    },

    image: {
        width: '90%',
        height: 200,
    },

    foodSectionContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingVertical: 8,
        paddingLeft: 8,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: Colors.LIGHT_BORDER,
        justifyContent: 'center',
        alignItems: 'center',
    },

    foodInfoContainer: {
        flex: 10,
        marginVertical: 4,
    },

    favButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // borderWidth: 1,
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

    reviewResultContainer: {
        flex: 18,
        overflow: 'hidden',
    },

    addReviewContainer: {
        flex: 3,
    },

    reviewResultIndivContainer: {
        marginTop: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER,
        borderRadius: 4,
    },

    reviewResultKey: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        paddingBottom: 4,
    },

    reviewResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
    },

    reviewsHeader: {
        marginTop: 20,
        marginBottom: 5,
    },

    reviewsHeaderText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
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

    endOfResultsTextContainer: {
        height: 180,
        paddingVertical: 20,
        fontStyle: 'italic',
        alignItems: 'center',
// justifyContent: 'center'
    },

    endOfResultsText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontStyle: 'italic'
    }

});


export default FoodDetails;