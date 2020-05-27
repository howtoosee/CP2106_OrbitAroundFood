import React, {useState} from 'react';
import {StyleSheet, Text, Button, View, ScrollView} from 'react-native';

import Colors from '../constants/Colors';
import DefaultStyles from "../constants/DefaultStyles";


function SearchResults(props) {

    return (
        <View style={DefaultStyles.screen}>
            <View style={DefaultStyles.header}>

                <View style={DefaultStyles.headerTextBox}>
                    <Text style={styles.headerTitle}>Search</Text>
                </View>

                <View style={DefaultStyles.headerBackButton}>
                    <Button title="BACK" color={Colors.DARKER_BUTTON} onPress={() => props.onPressBack()}/>
                </View>

            </View>

            <View style={DefaultStyles.contentContainer}>
                <View styl={Styles.searchResults}>
                    <Text>something something 1</Text>
                    <Text>something something 2</Text>
                    <Text>something something 3</Text>
                    <Text>something something 4</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    searchResults: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});


export default SearchResults;
