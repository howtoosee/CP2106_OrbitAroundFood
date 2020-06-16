import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Modal} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";
import DefaultHeader from "./DefaultHeader";
import Colors from "../constants/Colors";
import {searchQueryFood} from "../api/SearchApi";


function SearchResults(props) {

    const closeResults = () => {
        props.onPress();
    }

    const [isLoading, setLoading] = useState(true);
    const [results, setResList] = useState([]);

    searchQueryFood(props.searchKey, setResList, setLoading).then(r => setLoading(false));


    // placeholder results to test frontend
    // const results = {
    //     data: [
    //         {
    //             id: 0,
    //             key: props.searchKey,
    //             location: "com1",
    //             price: 1.11,
    //         },
    //         {
    //             id: 1,
    //             key: props.searchKey,
    //             location: "com2",
    //             price: 2.22,
    //         },
    //         {
    //             id: 2,
    //             key: props.searchKey,
    //             location: "as1",
    //             price: 3.33,
    //         }
    //     ]
    // };


    return (
        <Modal visible={props.showResults} animationType="slide">

            <View style={DefaultStyles.screen}>

                <DefaultHeader headerText="Results" onPress={() => closeResults()}/>

                <View style={DefaultStyles.contentContainer}>
                    {isLoading
                        ? <Text>Loading</Text>
                        : <ScrollView style={styles.searchResults}>
                            {results.data.map(item => (
                                <View style={styles.searchResultContainer} key={item.id}>
                                    <Text style={styles.searchResultKey}>{item.key}</Text>
                                    <Text style={styles.searchResultInfo}>{item.location}</Text>
                                    <Text style={styles.searchResultInfo}>{item.store_name}</Text>
                                    <Text style={styles.searchResultInfo}>${item.price}</Text>
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
