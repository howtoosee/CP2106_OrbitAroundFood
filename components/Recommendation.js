import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

import Colors from "../constants/Colors";
import DefaultStyles from "../constants/DefaultStyles";

import getRandomFood from "../api/RecommApi";


function Recommendation({navigation}) {

    const [foodObj, setFoodObj] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            getRandomFood(setLoading, setFoodObj)
                .then(() => setLoading(false))
                .catch(err => console.log("Error getting recommendation:", err));
        }
    });

    return (

        <View style={DefaultStyles.screen}>

            <View style={DefaultStyles.contentContainer}>
                <View style={styles.content}>
                    {(isLoading || foodObj === null)
                        ?
                        <ActivityIndicator size='large' color='black'/>
                        :
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
                                    {foodObj.store.store_name} ({foodObj.store.location})
                                </Text>

                                <Text style={styles.resultInfo}>
                                    {foodObj.store.open_hours} - {foodObj.store.close_hours}
                                </Text>
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
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    recommendationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },

    resultsKeyContainer: {
        paddingTop: 80,
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },

    resultsInfoContainer: {
        paddingBottom: 200,
        flex: 6,
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

});


export default Recommendation;
