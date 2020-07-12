import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Button, Image} from 'react-native';

import {readReviews} from "../api/ReviewsApi";
import getImage from "../api/FoodImage";
import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/Colors";


function FoodDetails({route, navigation}) {
    const [isLoading, setLoading] = useState(true);

    const foodObj = route.params?.foodObj;
    const [reviews, setReviews] = useState(null);
    const [photoUri, setPhotoUri] = useState('');


    useEffect(() => {
        if (isLoading) {
            readReviews(foodObj.id, setReviews)
                .catch(err => console.log("Error getting reviews:", err))

                // set image uri
                .then(() => getImage(foodObj.imageURL, setPhotoUri))
                .catch(err => console.log("Error getting image uri:", err))

                // finish loading everything, rerender
                .then(() => setLoading(false))
        }
    }, [readReviews, foodObj, setReviews, getImage, setPhotoUri, setLoading]);


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

                <View style={styles.imageContainer}>
                    {(isLoading || photoUri === '')
                        ? <ActivityIndicator size='large' color='black'/>
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
                            <ActivityIndicator size='large' color='black'/>
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
                            onPress={() => {
                                navigation.navigate("LeaveReview",
                                    {foodObj: foodObj}
                                );
                                setLoading(true);
                            }
                            }
                    />
                </View>
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
    }
});


export default FoodDetails;