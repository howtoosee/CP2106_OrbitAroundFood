import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, ScrollView, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors';
import DefaultStyles from "../constants/DefaultStyles";


function Search({navigation}) {
    const [searchString, setSearchString] = useState('');
    const [searchHist, setSearchHist] = useState([]);

    const searchInputHandler = (inputStr) => {
        setSearchString(inputStr);
    }

    const searchHandler = () => {
        if (isValidString(searchString)) {
            console.log("Searching for: " + searchString);
            addSearchHist();
            navigation.navigate('SearchResults', {searchKey: searchString});
        }
        // else ignore the search string
    }

    const isValidString = str => str.length > 0 && str.trim().length > 0;
    // checks if string is valid

    const addSearchHist = () => {
        setSearchHist([searchString, ...(searchHist.filter(item => item !== searchString))]
            .slice(0, 10));
        // remove pre-existing items identical to searchString and pre-append searchString to list

        setSearchString("");
        // reset search item box to empty
    };

    const clearHistory = () => setSearchHist([]);
    // clears search history

    const closeSearch = () => {
        navigation.navigate('Welcome', {
            searchHist: searchHist
        })
    }

    const getKey = objType => objType + "_" + Math.floor(Math.random() * 10000);
    // creates key for object


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
                        <Button title="FIND" color={Colors.BUTTON} onPress={searchHandler}/>
                    </View>

                </View>

                <View style={styles.searchHistoryContainer}>
                    <View style={styles.searchHistoryTitle}>
                        <Text style={styles.searchHistoryTitleText}>Search History</Text>
                    </View>

                    <ScrollView style={styles.searchHistoryContainer}>
                        {searchHist.map(item => (
                            <TouchableOpacity
                                key={getKey("touchable_opacity")}
                                onPress={() => searchInputHandler(item)}>

                                <View style={styles.searchHistoryTextContainer}>
                                    <Text style={styles.searchHistoryText} key={getKey("search_hist")}>
                                        {item}
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.searchHistoryClearButton}>
                        <Button title="Clear search history" color={Colors.BUTTON} onPress={clearHistory}/>
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

    searchHistoryTitle: {
        paddingLeft: 3,
        marginTop: 25,
    },

    searchHistoryTitleText: {
        color: Colors.TEXT,
        fontSize: 15,
        fontWeight: 'bold',
    },

    searchHistoryContainer: {
        marginLeft: 0,
        paddingTop: 10,
    },

    searchHistoryText: {
        color: Colors.TEXT,
    },

    searchHistoryTextContainer: {
        marginTop: 8,
        padding: 7,
        borderWidth: 2,
        borderColor: Colors.CARD,
        borderRadius: 5,
        width: '97%',
        color: Colors.TEXT,
    },

    searchHistoryClearButton: {
        paddingTop: 25,
        justifyContent: 'center',
    }
});


export default Search;
