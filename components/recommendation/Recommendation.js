import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, Image, SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';

import getImage from "../../api/FoodImage";
import getRandomFood from "../../api/RecommApi";
import {Colors, DefaultStyles} from "../../constants";
import FoodInfoContainer from "../support-components/FoodInfoContainer";

const {width, height} = Dimensions.get('window');


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

        <SafeAreaView style={DefaultStyles.screen}>

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
                            <FoodInfoContainer item={foodObj}
                                               navigation={navigation}
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

                        <View style={styles.buttonContainer}>

                            <Button title={"Another one!"}
                                    color={Colors.DARKER_BUTTON}
                                    onPress={refresh}
                            />

                        </View>

                    </View>
                }
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    headerInfoContainer: {
        flex: 1,
    },

    headerInfoText: {
        color: Colors.DARK_TEXT,
        fontStyle: 'italic',
        paddingVertical: '2%',
    },

    mainContentContainer: {
        flex: 29,
        height: '100%',
        // paddingBottom: '3%',
    },

    headerLineContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainer: {
        flex: 4,
        height: height * 0.25,
        marginTop: '3%',
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

    recommendationContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    buttonContainer: {
        flex: 4,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});


export default Recommendation;
