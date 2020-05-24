import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, ScrollView, TouchableOpacity} from 'react-native';


function Search() {
    const [searchString, setSearchString] = useState('');
    const [searchHist, setSearchHist] = useState([]);

    const searchInputHandler = input => setSearchString(input);

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

            {/* search bar */}
            <View style={styles.searchBar}>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="What do you wanna eat?"
                        onChangeText={searchInputHandler}
                        value={searchString}
                    />
                </View>

                <View style={styles.searchButton}>
                    <Button title="Find" onPress={searchHandler}/>
                </View>

            </View>

            {/*search history */}
            <View>
                <View style={styles.searchHistoryTitle}>
                    <Text>Search history</Text>
                </View>

                <ScrollView style={styles.searchHistoryContainer}>
                    {searchHist.map(item => (

                        <TouchableOpacity
                            key={getKey("touchable_opacity")}
                            onPress={() => searchInputHandler(item)}>

                            <View style={styles.searchHistoryText}>
                                <Text key={getKey("search_history_text")}>
                                    {item}
                                </Text>
                            </View>

                        </TouchableOpacity>

                    ))}
                </ScrollView>

                <Button title="Clear search history" onPress={clearHistory}/>
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
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inputContainer: {
        width: '80%',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
    },

    searchButton: {
        width: '20%',
        // borderWidth: 2,
        // borderColor: 'black',
    },

    searchHistoryTitle: {
        paddingLeft: 1,
        marginTop: 15,
        marginBottom: 5,
        fontWeight: 'bold',
    },

    searchHistoryContainer: {
        marginLeft: 10,
    },

    searchHistoryText: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        width: '80%',
    },

    searchHistoryClearButton: {
        justifyContent: 'space-around',
    }
})


export default Search;

