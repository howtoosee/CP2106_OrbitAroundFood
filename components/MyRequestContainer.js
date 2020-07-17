import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Fonts, Colors } from '../constants';

function MyRequestContainer({ navigation, store, location, open, close, food, price, destination, date, timingOfPurchase, remarks }) {

    return (
        <View style={styles.boxContainer}>
            <Text style={{ fontSize: Fonts.M, fontWeight: '700' }}>Lemme Help</Text>
            <Text>Food: {food}</Text>
            <Text>Store: {store}</Text>
            <Text>Location: {location}</Text>
            <Text>Operating Hours: {open} - {close} </Text>
            <Text>Estimated Price of Food: {price}</Text>
            <Text>Date of Food Request: {date}</Text>
            <Text>Estimated Time of Food Arrival: {timingOfPurchase}</Text>
            <Text>Meeting Place: {destination}</Text>
            <Text>Remarks: {remarks}</Text>
            <View style={styles.requestButton}>
                <Button
                    title='HELP'
                    color={Colors.ALT_BUTTON}
                    onPress={navigation}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    boxContainer: {
        width: '82%',
        margin: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: Colors.CARD
    },
    requestButton: {
        width: '25%',
        paddingVertical: 4
    }
});

export default MyRequestContainer;