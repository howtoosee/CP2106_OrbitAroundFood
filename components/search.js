import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, ScrollView, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

function Search(props) {
    const [searchString, setSearchString] = useState('');
    const [searchHist, setSearchHist] = useState([]);


    const searchInputHandler = (input) => {
        setSearchString(input);
    }


    const searchHandler = () => {
        if (isValidString(searchString)) {
            search(searchString);
            addSearchHist();
            // do other stuff here
        }
        // else ignore the search string
    }


    const search = searchKey => {
        console.log("Searching for: " + searchKey);
        return null;
    };


    const addSearchHist = () => {
        setSearchHist(searchHist.filter(item => item !== searchString));
        // removes preexisting items that are identical in search history

        setSearchHist(currHist => [searchString, ...currHist].slice(0, 10));
        // pre-append item to list

        setSearchString("");
        // reset search item box to empty
    };


    const clearHistory = () => setSearchHist([]);
    // clears search history


    const isValidString = str => str.length > 0 && str.trim().length > 0;
    // checks if string is valid


    const getKey = objType => objType + "_" + Math.floor(Math.random() * 10000);
    // creates key for object


    return (
        <View style={styles.screen}>

            <View style={styles.searchBar}>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="What do you wanna eat?"
                        onChangeText={searchInputHandler}
                        value={searchString}
                    />
                </View>

                <View style={styles.buttons}>
                    <Button title="FIND" color={Colors.button} onPress={searchHandler}/>
                    <Button title="BACK" color={Colors.darkerButton} onPress={() => props.onPressBack(true)}/>
                </View>

            </View>

            <View>
                <View style={styles.searchHistoryTitle}>
                    <Text style={styles.searchHistory}>Search History</Text>
                </View>

                <ScrollView style={styles.searchHistoryContainer}>
                    {searchHist.map(item => (
                        <TouchableOpacity
                            key={getKey("touchable_opacity")}
                            onPress={() => searchInputHandler(item)}>

                            <View style={styles.searchHistoryText}>
                                <Text style={styles.text} key={getKey("search_history_text")}>
                                    {item}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.searchHistoryClearButton}>
                    <Button title="Clear search history" color={Colors.button} onPress={clearHistory}/>
                </View>

            </View>

        </View>


    );
}


const styles = StyleSheet.create({
    screen: {
        paddingVertical: 50,
        paddingHorizontal: 30,
    },

    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    buttons: {
        flex: 1,
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'space-around'
    },

    inputContainer: {
        flex: 2,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 8,
    },

    searchHistoryTitle: {
        paddingLeft: 1,
        marginTop: 15,
        fontWeight: 'bold',
    },

    searchHistory: {
        color: Colors.words
    },

    searchHistoryContainer: {
        marginLeft: 10,
    },

    text: {
        color: Colors.words
    },

    searchHistoryText: {
        marginTop: 5,
        padding: 7,
        borderWidth: 3,
        borderColor: Colors.card,
        borderRadius: 2,
        width: '78%',
        color: Colors.words
    },

    searchHistoryClearButton: {
        paddingTop: 5,
        justifyContent: 'space-around'
    }
})


export default Search;
