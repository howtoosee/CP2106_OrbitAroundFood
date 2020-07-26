import React, {useEffect, useState, useCallback} from "react";
import {
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import FoodInfoContainer from "../support-components/FoodInfoContainer";
import {Colors, DefaultStyles, Fonts} from "../../constants";
import searchQueryFood from "../../api/SearchApi";

const {width, height} = Dimensions.get('window');


function SearchResults({route, navigation}) {
    const {searchKey} = route.params;
    const {filters} = route.params;
    const {filterNames} = route.params;
    const filterString = filterNames.length === 0
        ? "None" : filterNames.join(", ");

    const [isLoading, setLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);
    const [results, setResList] = useState([]);

    const loadSearchResults = () => {
        searchQueryFood(searchKey, setResList, filters)
            .then(() => setLoading(false))
            .catch((err) => console.log("Error during search querying:", err));
    }

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const refresh = useCallback(() => {
        setRefreshing(true);
        loadSearchResults();
        wait(2000).then(() => setRefreshing(false));
    });

    useEffect(() => {
        if (isLoading) {
            loadSearchResults();
        }
    }, [isLoading, searchKey, searchQueryFood, setResList, setLoading]);

    return (
        <SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.resultStatInfo}>

                <Text style={styles.resultStatText}>
                    Searching for: "{searchKey}"
                </Text>

                <Text style={styles.resultStatText}>
                    Filters: {filterString}
                </Text>

            </View>

            <View style={{flex: 19}}>

                {isLoading
                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="black"/>
                    </View>

                    : (results.length === 0)
                        ? <View style={styles.noResultsContainer}>

                            <View style={styles.noResultTextContainer}>
                                <Text style={styles.noResultText}>
                                    No results found :(
                                </Text>
                            </View>

                        </View>

                        : <View>

                            <View style={styles.resultLengthStatInfo}>

                                <Text style={styles.resultLengthStatText}>
                                    Results found: {results.length}
                                </Text>

                            </View>

                            <ScrollView style={styles.searchResults}
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl refreshing={isRefreshing} onRefresh={refresh}/>
                                        }
                            >
                                {results.map((item) =>
                                    getResultItemElement(item, navigation)
                                )}

                                <View style={styles.endOfResultsText}>

                                    <Text style={styles.endOfResultsText}>
                                        No more liao!
                                    </Text>

                                </View>

                            </ScrollView>

                        </View>
                }
            </View>

        </SafeAreaView>
    );
}


function getResultItemElement(item, navigation) {
    const getKey = (name, objType) =>
        name + "_" + objType + "_" + Math.floor(Math.random() * 10000);

    return (
        <FoodInfoContainer
            key={getKey(item.name, "list")}
            item={item}
            navigation={navigation}
        />
    );
}


const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    noResultsContainer: {
        alignItems: "center",
        justifyContent: "center"
    },

    resultStatInfo: {
        flex: 1,
        marginTop: '2%',
        marginBottom: '2%',
        color: Colors.TEXT,
        fontStyle: "italic",
        justifyContent: "center",
    },

    resultLengthStatInfo: {
        // borderWidth: 1,
        marginTop: '2%',
        // marginBottom: '0%',
        color: Colors.TEXT,
        fontStyle: "italic",
        justifyContent: "center",
    },

    resultStatText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        paddingVertical: '1%',
    },

    resultLengthStatText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        paddingBottom: '3%',
    },

    searchResults: {
        // paddingTop: 0,
        // marginHorizontal: '1%',
        marginTop: 10,
    },

    noResultTextContainer: {
        height: '100%',
        justifyContent: 'center',
        marginBottom: '10%',
    },

    noResultText: {
        fontSize: Fonts.M,
        color: Colors.TEXT,
        fontStyle: "italic",
        fontWeight: "bold",
        paddingBottom: '5%',
    },

    endOfResultsText: {
        flex: 1,
        marginTop: 0.05 * height,
        marginBottom: 0.1 * height,
        fontSize: Fonts.XS,
        color: Colors.TEXT,
        fontStyle: "italic",
        alignItems: "center",
        justifyContent: 'flex-start',
    }
});

export default SearchResults;
