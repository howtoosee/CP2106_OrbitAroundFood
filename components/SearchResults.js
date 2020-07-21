import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Button} from 'react-native';

import FoodInfoContainer from './FoodInfoContainer';
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
                                    <Text style={styles.endOfResultsText}>No more liao!</Text>
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
        <FoodInfoContainer
            key={getKey(item.name, 'list')}
            item={item}
            navigation={navigation}
        />
    );
}


const styles = StyleSheet.create({
    searchResults: {
        marginLeft: 0,
        paddingTop: 0,
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
        fontSize: Fonts.M,
        color: Colors.TEXT,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    endOfResultsText: {
        height: 180,
        paddingVertical: 20,
        fontSize: Fonts.XS,
        color: Colors.TEXT,
        fontStyle: 'italic',
        alignItems: 'center',
        // justifyContent: 'center'
    }
});


export default SearchResults;
