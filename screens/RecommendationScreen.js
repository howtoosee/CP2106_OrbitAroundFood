import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../constants/Colors';

const RecommendationScreen = props => {
    return (
        <View style={styles.screen}>  
            <View style={styles.header}>
                <Text style={styles.title}>FOOD OF THE DAY</Text>
            </View>
            <View style={styles.food}>
                <Text style={styles.text}>Chicken Rice</Text>
                <Text style={styles.text}>Price: $2.00</Text>
                <Text style={styles.text}>Stall: Chickenlicious</Text>
                <Text style={styles.text}>Location: The Deck at FASS</Text>
            </View>
            <View style={styles.button}>
                <Button title="BACK" color={Colors.darkerButton} onPress={() => {props.onPressBack(true)}}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
      },
      header: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      title: {
        borderWidth: 4,
        borderColor: Colors.button,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25
      },
      food: {
        flex: 0.9,
        paddingTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
      },
      text: {
        fontSize: 22
      },
      button: {
        flex: 1,
        paddingTop: 30,
        justifyContent: 'flex-start',
        width: '20%'
      }
});

export default RecommendationScreen;