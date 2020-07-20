import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Button} from 'react-native';

import {Colors, DefaultStyles, Fonts} from "../constants";

import getRandomFood from "../api/RecommApi";


function Recommendation({navigation}) {

    const [foodObj, setFoodObj] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const refresh = () => {
        setLoading(true);
        setFoodObj(null);
    }


    useEffect(() => {
        if (isLoading) {
            getRandomFood(setLoading, setFoodObj)
                .then(() => setLoading(false))
                .catch(err => console.log("Error getting recommendation:", err));
        }
    }, [foodObj, isLoading, getRandomFood, setLoading, setFoodObj]);


    return (

        <View style={DefaultStyles.screen}>

            <View style={styles.content}>
                {(isLoading || foodObj === null)
                    ?
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='black'/>
                    </View>
                    :
                    <View style={{flex: 1}}>
                        <View style={styles.recommendationContainer}>

                            <View style={styles.resultsKeyContainer}>
                                <Text style={styles.resultKey}>
                                    {foodObj.name}
                                </Text>
                            </View>

                            <View style={styles.resultsInfoContainer}>
                                <Text style={styles.resultInfo}>
                                    {foodObj.price}
                                </Text>

                                <Text style={styles.resultInfo}>
                                    {foodObj.store.store_name}{'\n'}{foodObj.store.location}
                                </Text>

                                <Text style={styles.resultInfo}>
                                    {foodObj.store.open_hours} - {foodObj.store.close_hours} hrs
                                </Text>
                            </View>

                        </View>

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
                }

            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    content: {
        flex: 1,
        paddingVertical: 100,
    },

    loadingContainer: {
        flex: 1,
        paddingBottom: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    recommendationContainer: {
        flex: 18,
        paddingHorizontal: 30,
        width: '100%',
        alignItems: 'baseline',
        justifyContent: 'center',
    },

    resultsKeyContainer: {
        flex: 4,
        paddingTop: 50,
        paddingBottom: 40,
        flexWrap: 'wrap',
        alignItems: 'flex-start', // keep left
        justifyContent: 'flex-end', // keep bottom
    },

    resultsInfoContainer: {
        flex: 6,
        paddingBottom: 100,
        flexWrap: 'wrap',
        alignItems: 'flex-start', // keep left
        justifyContent: 'space-around', // keep bottom
    },

    resultKey: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
        fontWeight: 'bold',
    },

    resultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
    },

    detailsButtonContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
    },

    refreshButtonContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingHorizontal: 15,
    }


});


export default Recommendation;
