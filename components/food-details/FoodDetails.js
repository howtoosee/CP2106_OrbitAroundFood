import React, {useEffect, useState, useCallback} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    Image, RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {readReviews} from "../../api/ReviewsApi";
import getImage from "../../api/FoodImage";
import {addFavourite, isFavourite, removeFavourite} from "../../api/FavouritesLogic";
import FoodInfoContainer from "../support-components/FoodInfoContainer";
import requireSignInAlert from "../support-components/ComponentRequiresSignInAlert";

import {Colors, DefaultStyles, Fonts} from "../../constants";
import * as firebase from 'firebase';

const {width, height} = Dimensions.get('window');


function FoodDetails({route, navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);

    const [user, setUser] = useState(firebase.auth().currentUser);

    const onGoBack = route.params?.onGoBack ? route.params.onGoBack : () => null;
    const foodObj = route.params?.foodObj;
    const [isSaved, setSaved] = useState(isFavourite(foodObj));
    const [rating, setRating] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [photoUri, setPhotoUri] = useState('');

    const addReviewHandler = () => {
        if (user) {
            navigation.navigate("Create Review",
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
        onGoBack();
        // favAlert('added');
    }

    const removeFavHandler = () => {
        removeFavourite(foodObj);
        setSaved(false);
        onGoBack();
        // favAlert('removed');
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

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const refresh = useCallback(() => {
        setRefreshing(true);
        loadReviews();
        wait(1000).then(() => setRefreshing(false));
    });

    useEffect(() => {
        if (isLoading) {
            loadReviews();
        }

        return firebase.auth().onAuthStateChanged(() => {
            setUser(firebase.auth().currentUser);
        });
    }, [readReviews, foodObj, setReviews, getImage, setPhotoUri, setLoading]);


    return (
        <SafeAreaView style={DefaultStyles.screen}>

            <View style={{height: height * 0.16}}>
                <FoodInfoContainer
                    item={foodObj}
                    useFavButton={true}
                    isSaved={isSaved}
                    addFavHandler={addFavHandler}
                    removeFavHandler={removeFavHandler}
                    buttonType={'favs'}
                    onGoBack={() => onGoBack()}
                />
            </View>

            <View style={styles.imageContainer}>
                {(isLoading || photoUri === '')
                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size='small' color='black'/>
                    </View>
                    : <Image
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
                            <Text style={styles.noResultText}>
                                No reviews yet.
                            </Text>
                        </View>

                        : <View>

                            <View style={styles.reviewsHeader}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.ratingText}>Rating: </Text>
                                    <Text style={styles.ratingNumberText}>{rating}</Text>
                                </View>

                                <Text style={styles.reviewsHeaderText}>Reviews:</Text>
                            </View>

                            <ScrollView style={{overflow: 'hidden', marginHorizontal: '1%'}}
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl refreshing={isRefreshing} onRefresh={refresh}/>
                                        }

                            >
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
                <Button title={'Lemme review'}
                        color={user ? Colors.BUTTON : Colors.DISABLED_BUTTON}
                        onPress={addReviewHandler}
                />
            </View>
        </SafeAreaView>
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

            <Text style={styles.reviewResultInfo} numberOfLines={3} ellipsizeMode={'tail'}>
                {rev.comments}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({

    imageContainer: {
        // flex: 10,
        height: height * 0.25,
        paddingTop: height * 0.008,
        // paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.LIGHT_BORDER
    },


    reviewResultContainer: {
        // flex: 18,
        overflow: 'hidden',
        height: '45%',
        // borderWidth: 1,
    },

    addReviewContainer: {
        // flex: 2,
        height: '8%',
        justifyContent: 'center',
    },

    reviewResultIndivContainer: {
        marginTop: 0.01 * height,
        padding: 0.006 * height,
        borderWidth: 1,
        borderColor: Colors.BORDER,
        borderRadius: 4,
    },

    reviewResultKey: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        paddingBottom: '1%',
    },

    reviewResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
    },

    ratingText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: "bold",
        marginBottom: '2%',
    },

    ratingNumberText: {
        color: Colors.DARKER_BUTTON,
        fontSize: Fonts.S,
        fontWeight: "bold",
        fontStyle: 'italic',
        marginBottom: '2%',
    },

    reviewsHeader: {
        marginTop: '4%',
        marginBottom: '1%',
    },

    reviewsHeaderText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: "bold",
        marginTop: '1%',
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    noResultsContainer: {
        height: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },

    noResultText: {
        fontSize: Fonts.M,
        color: Colors.TEXT,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    endOfResultsTextContainer: {
        height: '100%',
        marginTop: 0.05 * height,
        marginBottom: 0.1 * height,
        fontStyle: 'italic',
        alignItems: 'center',
// justifyContent: 'center'
    },

    endOfResultsText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
        fontStyle: 'italic'
    }

});


export default FoodDetails;