import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Button} from 'react-native';

import {Colors, DefaultStyles, Fonts} from "../constants";
import searchQueryFood from "../api/SearchApi";


function SearchResults({route, navigation}) {
    const {searchKey} = route.params;
    const {filters} = route.params;
    const {filterNames} = route.params;
    const filterString = filterNames.length === 0 ? "none" : filterNames.join(", ");

    const [isLoading, setLoading] = useState(true);
    const [results, setResList] = useState([]);

    useEffect(() => {
        if (isLoading) {
            searchQueryFood(searchKey, setResList, filters)
                .then(() => setLoading(false))
                .catch(err => console.log('Error querying:', err));
        }
    }, [isLoading, searchKey, searchQueryFood, setResList, setLoading]);


    return (

        <View style={DefaultStyles.screen}>

            <View style={DefaultStyles.contentContainer}>

                <View style={styles.resultStatInfo}>
                    <Text style={styles.resultStatText}>Searching for: "{searchKey}"</Text>
                    <Text style={styles.resultStatText}>Filters: {filterString}</Text>
                </View>

                {(isLoading)

                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='black'/>
                    </View>

                    : (results.length === 0)

                        ? <View style={styles.noResultsContainer}>
                            <View style={styles.resultStatInfo}>
                                <Text style={styles.noResultText}>No results found :(</Text>
                            </View>
                        </View>

                        : <View>
                            <View style={styles.resultStatInfo}>
                                <Text style={styles.resultStatText}>Results found: {results.length}</Text>
                            </View>


                            <ScrollView style={styles.searchResults}>
                                {
                                    results.map(item => getResultItemElement(item, navigation))
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


function getResultItemElement(item, navigation) {
    const getKey = (name, objType) => name + '_' + objType + "_" + Math.floor(Math.random() * 10000);

    return (
        <View style={styles.searchResultContainer} key={getKey(item.name, 'list')}>

            <View style={styles.searchResultInfoContainer}>
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

            <View style={styles.detailsButtonContainer}>
                <Button title={'More'}
                        titleStyle={styles.detailsButton}
                        color={Colors.BUTTON}
                        onPress={() => navigation.navigate('Food Details',
                            {
                                foodObj: item
                            })
                        }
                />
            </View>

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
        padding: 8,
        borderWidth: 2,
        borderColor: Colors.BORDER,
        borderRadius: 4,
        width: '97%',
        flexDirection: 'row',
    },

    searchResultKey: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: "bold",
        paddingBottom: 6,
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        paddingBottom: 2,
    },

    loadingContainer: {
        flex: 1,
        paddingBottom: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    noResultsContainer: {
        paddingTop: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },

    searchResultInfoContainer: {
        flex: 10,
    },

    detailsButtonContainer: {
        flex: 4,
        justifyContent: 'space-around',
        alignItems: 'flex-end',

    },

    detailsButton: {
        fontSize: 12,
    },

    resultStatInfo: {
        marginTop: 4,
        marginBottom: 4,
        color: Colors.TEXT,
        fontStyle: 'italic',
    },

    resultStatText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
    },

    noResultText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.M,
        fontStyle: 'italic',
        fontWeight: 'bold',
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
