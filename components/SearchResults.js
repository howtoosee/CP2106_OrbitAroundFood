import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Modal, ActivityIndicator} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";
import DefaultHeader from "./DefaultHeader";
import Colors from "../constants/Colors";
import {searchQueryFood} from "../api/SearchApi";

function SearchResults(props) {

    const closeResults = props.onPress;

    const [isLoading, setLoading] = useState(true);
    const [results, setResList] = useState([]);

    if (props.showResults) {
        searchQueryFood(props.searchKey, setResList, setLoading);
    }

    const getKey = (name, objType) => name + '_' + objType + "_" + Math.floor(Math.random() * 10000);



    return (
        <Modal visible={props.showResults} animationType="slide">

            <View style={DefaultStyles.screen}>

                <DefaultHeader headerText="Results" onPress={closeResults}/>

                <View style={DefaultStyles.contentContainer}>
                    {(isLoading || !props.showResults || results === null)
                        ? <ActivityIndicator/>
                        : <ScrollView style={styles.searchResults}>
                            {results.map(item => (
                                <View style={styles.searchResultContainer} key={getKey(item.name, 'list')}>
                                    <Text style={styles.searchResultKey}>{item.name}</Text>
                                    <Text style={styles.searchResultInfo}>{item.price}</Text>
                                    <Text style={styles.searchResultInfo}>{item.store}</Text>
                                    {/*<Text style={styles.searchResultInfo}>{item.store.location}</Text>*/}
                                    {/*<Text style={styles.searchResultInfo}>{item.store.open_hours}</Text>*/}
                                    {/*<Text style={styles.searchResultInfo}>{item.store.close_house}</Text>*/}
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
