import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, Button} from 'react-native';

import Colors from "../constants/Colors";
import DefaultStyles from "../constants/DefaultStyles";

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

            <View style={DefaultStyles.contentContainer}>
                <View style={styles.content}>
                    {(isLoading || foodObj === null)
                        ?
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size='large' color='black'/>
                        </View>
                        :
                        <View>
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

                                <View>

                                </View>

                            </View>

                            <View style={styles.detailsButtonContainer}>
                                <Button title={'More'}
                                        onPress={() => navigation.navigate('Food Details',
                                            {
                                                foodObj: foodObj
                                            })}
                                />
                            </View>

                            <View style={styles.refreshButtonContainer}>

                                <Button title={"Another one!"}
                                        onPress={refresh}
                                />
                            </View>
                        </View>
                    }

                </View>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    content: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    loadingContainer: {
        flex: 1,
        paddingBottom: 100,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    recommendationContainer: {
        flex: 18,
        paddingLeft: 10,
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    resultsKeyContainer: {
        paddingTop: 50,
        flex: 5,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    resultsInfoContainer: {
        paddingBottom: 150,
        flex: 6,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },

    resultKey: {
        color: Colors.TEXT,
        fontSize: 26,
        fontWeight: 'bold',
    },

    resultInfo: {
        color: Colors.TEXT,
        fontSize: 24,
    },

    detailsButtonContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
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
