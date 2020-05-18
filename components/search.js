import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, ScrollView} from 'react-native';


function Search() {
    const [searchItem, setSearchItem] = useState('');
    const [searchHist, setSearchHist] = useState([]);

    const searchInputHandler = input => setSearchItem(input);
    const addSearchHist = () => {setSearchHist(currHist => [searchItem, ...currHist].slice(0,10))};


    return (
        <View style = {styles.screen}>

            {/* search bar */}
            <View style={styles.searchBar}>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="What do you wanna eat?"
                        onChangeText={searchInputHandler}
                        value={searchItem}
                    />
                </View>

                <View style = {styles.searchButton}>
                    <Button title="Find" onPress={addSearchHist}/>
                </View>

            </View>

             {/*search history */}
            <ScrollView style={styles.searchHistoryContainer}>

                <View style={styles.searchHistoryTitle}>
                    <Text>Search history</Text>
                </View>

                {searchHist.map(item => (
                    <View key={item} style={styles.searchHistoryText}>
                        <Text>{item}</Text>
                    </View>
                ))}

            </ScrollView>


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
    }
})



export default Search;

