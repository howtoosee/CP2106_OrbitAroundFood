import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Colors from "../constants/Colors";
import DefaultStyles from "../constants/DefaultStyles";
import DefaultHeader from "./DefaultHeader";


function Recommendation({navigation}) {

    return (

        <View style={DefaultStyles.screen}>

            {/* <DefaultHeader headerText="FoodOTD" onPress={() => navigation.goBack()}/> */}

            <View style={DefaultStyles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.text}>Chicken Rice</Text>
                    <Text style={styles.text}>Price: $2.00</Text>
                    <Text style={styles.text}>Stall: Chickenlicious</Text>
                    <Text style={styles.text}>Location: The Deck at FASS</Text>
                </View>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    content: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 150,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: 250,
    },

    text: {
        fontSize: 25,
        color: Colors.TEXT,
    },

});


export default Recommendation;
