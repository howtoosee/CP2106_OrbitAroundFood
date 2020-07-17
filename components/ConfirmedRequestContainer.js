import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Fonts, Colors } from '../constants';

function ConfirmedRequestContainer({store, open, close, location, food, price, destination, date, timingOfPurchase, customerRemarks, buyerContact, buyerRemarks }) {

    return (
        <View style={styles.boxContainer}>
            <Text style={{ fontSize: Fonts.M, fontWeight: '700' }}>Confirmed Request</Text>
            <Text>Food: {food}</Text>
            <Text>Store: {store}</Text>
            <Text>Location: {location}</Text>
            <Text>Operating Hours: {open} - {close} </Text>
            <Text>Estimated Price of Food: {price}</Text>
            <Text>Date of Food Request: {date}</Text>
            <Text>Estimated Time of Food Arrival: {timingOfPurchase}</Text>
            <Text>Meeting Place: {destination}</Text>
            <Text>Customer Remarks: {customerRemarks}</Text>
            <Text>Buyer Contact: {buyerContact}</Text>
            <Text>Buyer Remarks: {buyerRemarks}</Text>
        </View>
    );

}

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
    }
});

export default ConfirmedRequestContainer;