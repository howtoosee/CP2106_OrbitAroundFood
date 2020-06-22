import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Modal, ActivityIndicator} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";
import DefaultHeader from "./DefaultHeader";
import Colors from "../constants/Colors";
import searchQueryFood from "../api/SearchApi";


function SearchResults(props) {
    const closeResults = () => {
        props.onPress();
        setLoading(true);
        setResList([]);
    }

    const [isLoading, setLoading] = useState(true);
    const [results, setResList] = useState([]);

    if (props.showResults && results.length === 0 && isLoading) {
        searchQueryFood(props.searchKey, setResList, setLoading);
    }

    const getKey = (name, objType) => name + '_' + objType + "_" + Math.floor(Math.random() * 10000);


    return (
        <Modal visible={props.showResults} animationType="slide">

            <View style={DefaultStyles.screen}>

                <DefaultHeader headerText="Results" onPress={closeResults}/>

                <View style={DefaultStyles.contentContainer}>
                    <View style={styles.searchResultInfo}><Text>Searching for: "{props.searchKey}"</Text></View>
                    {(isLoading && (!props.showResults || results.length === 0))
                        ? <ActivityIndicator/>
                        : (results.length === 0)
                            ? <View style={styles.searchResultInfo}><Text>No results found</Text></View>
                            : <ScrollView style={styles.searchResults}>
                                <Text>Results found: {results.length}</Text>
                                {results.map(item => (
                                    <View style={styles.searchResultContainer} key={getKey(item.name, 'list')}>
                                        <Text style={styles.searchResultKey}>{item.name}</Text>
                                        <Text style={styles.searchResultInfo}>{item.price}</Text>
                                        <Text
                                            style={styles.searchResultInfo}>{item.store.store_name} ({item.store.location})</Text>
                                        <Text
                                            style={styles.searchResultInfo}>{item.store.open_hours} - {item.store.close_hours}</Text>
                                    </View>
                                ))}
                            </ScrollView>

                    }

                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    searchResults: {
        marginLeft: 0,
        paddingTop: 10,
    },

    searchResultContainer: {
        marginTop: 15,
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.CARD,
        borderRadius: 5,
        width: '97%',
        color: Colors.TEXT,
    },

    searchResultKey: {
        color: Colors.TEXT,
        fontSize: 18,
        fontWeight: "bold",
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: 16,
    },
});


export default SearchResults;
