import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';

import DefaultStyles from "../constants/DefaultStyles";
import Colors from "../constants/Colors";
import searchQueryFood from "../api/SearchApi";


function SearchResults({route, navigation}) {
    const {searchKey} = route.params;

    const closeResults = () => {
        setLoading(true);
        setResList([]);
        navigation.goBack();
    }

    const [isLoading, setLoading] = useState(true);
    const [results, setResList] = useState([]);


    if (isLoading) {
        searchQueryFood(searchKey, setResList)
            .then(() => setLoading(false))
            .catch(err => console.log('Error querying:', err));
    }


    return (

        <View style={DefaultStyles.screen}>

            {/*<DefaultHeader headerText="Results" onPress={closeResults}/>*/}

            <View style={DefaultStyles.contentContainer}>

                <View style={styles.resultStatInfo}>
                    <Text>Searching for: "{searchKey}"</Text>
                </View>

                {(isLoading)

                    ? <View style={styles.loadingIndicatorContainer}>
                        <ActivityIndicator size='large' color='black'/>
                    </View>

                    : (results.length === 0)

                        ? <View style={styles.noResultsContainer}>
                            <View style={styles.searchResultInfo}>
                                <Text>No results found :(</Text>
                            </View>
                        </View>

                        : <View>
                            <View style={styles.resultStatInfo}>
                                <Text>Results found: {results.length}</Text>
                            </View>


                            <ScrollView style={styles.searchResults}>
                                {
                                    results.map(item => getResultItemElement(item))
                                }

                                <View style={styles.endOfResultsText}>
                                    <Text>No more liao!</Text>
                                </View>

                            </ScrollView>

                        </View>
                }

            </View>
        </View>

    )
}


function getResultItemElement(item) {
    const getKey = (name, objType) => name + '_' + objType + "_" + Math.floor(Math.random() * 10000);

    return (
        <View style={styles.searchResultContainer} key={getKey(item.name, 'list')}>

            <Text style={styles.searchResultKey}>
                {item.name}
            </Text>

            <Text style={styles.searchResultInfo}>
                {item.price}
            </Text>

            <Text style={styles.searchResultInfo}>
                {item.store.store_name} ({item.store.location})
            </Text>

            <Text style={styles.searchResultInfo}>
                {item.store.open_hours} - {item.store.close_hours}
            </Text>

        </View>
    );
}


const styles = StyleSheet.create({
    searchResults: {
        marginLeft: 0,
        paddingTop: 0,
    },

    searchResultContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
        // borderColor: Colors.CARD,
        borderColor: Colors.TEXT,
        borderRadius: 4,
        width: '97%',
        color: Colors.TEXT,
    },

    searchResultKey: {
        color: Colors.TEXT,
        fontSize: 16,
        fontWeight: "bold",
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: 14,
    },

    loadingIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 100,
    },

    noResultsContainer: {
        paddingTop: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },

    resultStatInfo: {
        marginTop: 4,
        marginBottom: 4,
        fontSize: 14,
        color: Colors.TEXT,
        fontStyle: 'italic',
    },

    endOfResultsText: {
        height: 180,
        paddingVertical: 20,
        fontStyle: 'italic',
        alignItems: 'center',
        // justifyContent: 'center'
    }
});


export default SearchResults;
