import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import DefaultStyles from "../constants/DefaultStyles";

function RequestDirectory({ navigation, route }) {
    const onGoBack = route.params?.onGoBack;
    const [searchString, setSearchString] = useState('');

    const searchInputHandler = (inputStr) => {
        setSearchString(inputStr);
    }

    const searchHandler = () => {
        if (isValidString(searchString)) {
            console.log("Searching for: " + searchString);
            navigation.navigate('Food Choices', {
                searchKey: searchString,
                onGoBack: () => onGoBack()
            });
        }
        // else ignore the search string
    }

    const isValidString = str => str.length > 0 && str.trim().length > 0;

    return (
        <View style={DefaultStyles.screen}>
            <View style={DefaultStyles.contentContainer}>
                <View style={styles.searchBar}>

                    <View style={styles.inputContainer}>

                        <TextInput style={styles.inputText}
                            placeholder="What do you wanna eat?"
                            onChangeText={searchInputHandler}
                            value={searchString}
                        />

                    </View>

                    <View style={styles.searchButton}>
                        <Button title="FIND" color={Colors.BUTTON} onPress={searchHandler} />
                    </View>

                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    searchBar: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    searchButton: {
        flex: 1,
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    inputContainer: {
        flex: 4,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 8,
    },

    inputText: {
        fontSize: 16,
    },
});

export default RequestDirectory;