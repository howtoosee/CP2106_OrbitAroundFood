import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Button, Image} from 'react-native';

import getImage from "../api/FoodImage";
import {Colors, DefaultStyles, Fonts} from "../constants";

import getRandomFood from "../api/RecommApi";


function Recommendation({navigation}) {

    const [isLoading, setLoading] = useState(true);
    const [foodObj, setFoodObj] = useState(null);
    const [photoUri, setPhotoUri] = useState('');

    const refresh = () => {
        setLoading(true);
        setFoodObj(null);
        setPhotoUri('');
    }


    useEffect(() => {
        if (isLoading) {
            getRandomFood(setFoodObj)
                .catch(err => console.log('Error getting recommendation:', err))
                .then(() => setLoading(false));
        }

        if (foodObj) {
            getImage(foodObj.imageURL, setPhotoUri)
                .catch(err => console.log('Error getting image:', err))
        } // else: wait
    }, [isLoading, getRandomFood, setLoading, setFoodObj, getImage, setPhotoUri]);


    return (

        <View style={DefaultStyles.screen}>

            <View style={styles.headerInfoContainer}>
                <Text style={styles.headerInfoText}>Recommends a dish that's at least 3-star rated!</Text>
            </View>

            <View style={styles.mainContentContainer}>
                {(isLoading || foodObj === null)
                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='black'/>
                    </View>

                    : <View style={{flex: 1, height: '100%', justifyContent: 'flex-start'}}>
                        <View style={styles.recommendationContainer}>
                            <View style={styles.headerLineContainer}>

                                <Text style={styles.searchResultKey}>
                                    {foodObj.name}
                                </Text>

                                <Text style={styles.searchResultInfo}>
                                    ({foodObj.price})
                                </Text>
                            </View>

                            <Text style={styles.searchResultInfo}>
                                {foodObj.store.store_name} ({foodObj.store.location})
                            </Text>

                            <Text style={styles.searchResultInfo}>
                                {foodObj.store.open_hours} - {foodObj.store.close_hours}
                            </Text>
                        </View>
                        {/*<View style={styles.recommendationContainer}>*/}

                        {/*    <View style={styles.resultsKeyContainer}>*/}
                        {/*        <Text style={styles.resultKey}>*/}
                        {/*            {foodObj.name}*/}
                        {/*        </Text>*/}
                        {/*    </View>*/}

                        {/*    <View style={styles.resultsInfoContainer}>*/}
                        {/*        <Text style={styles.resultInfo}>*/}
                        {/*            {foodObj.price}*/}
                        {/*        </Text>*/}

                        {/*        <Text style={styles.resultInfo}>*/}
                        {/*            {foodObj.store.store_name}{'\n'}{foodObj.store.location}*/}
                        {/*        </Text>*/}

                        {/*        <Text style={styles.resultInfo}>*/}
                        {/*            {foodObj.store.open_hours} - {foodObj.store.close_hours} hrs*/}
                        {/*        </Text>*/}
                        {/*    </View>*/}

                        {/*</View>*/}

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

                        <View style={styles.buttonContainer}>

                            <View style={styles.detailsButtonContainer}>
                                <Button title={'Details'}
                                        color={Colors.BUTTON}
                                        onPress={() => navigation.navigate('Food Details',
                                            {
                                                foodObj: foodObj
                                            })}
                                />
                            </View>

                            <View style={styles.refreshButtonContainer}>

                                <Button title={"Another one!"}
                                        color={Colors.DARKER_BUTTON}
                                        onPress={refresh}
                                />
                            </View>

                        </View>

                    </View>
                }
            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    headerInfoContainer: {
        marginTop: 10,
        marginBottom: 20,
    },

    headerInfoText: {
        color: Colors.DARK_TEXT,
        fontStyle: 'italic'
    },

    mainContentContainer: {
        height: '95%',
        paddingBottom: 20,
    },

    headerLineContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4
    },

    searchResultKey: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: "bold",
        paddingBottom: 4,
        marginRight: 10,
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        paddingBottom: 4,
    },


    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        flex: 4,
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 300,
        height: 300,
        marginVertical: 80,
        alignItems: 'center',
        justifyContent: 'center',
        // overflow: 'visible',
    },

    recommendationContainer: {
        flex: 2,
        paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    buttonContainer: {
        flex: 4,
        paddingBottom: 20,
    },

    detailsButtonContainer: {
        flex: 6,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    refreshButtonContainer: {
        flex: 4,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }


});


export default Recommendation;
