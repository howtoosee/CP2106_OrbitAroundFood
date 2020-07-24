import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions, SafeAreaView} from "react-native";

import {Colors, DefaultStyles, Fonts} from "../../constants";
import searchQueryFood from "../../api/SearchApi";
import FoodInfoContainer from "../support-components/FoodInfoContainer";


const {width, height} = Dimensions.get('window');


function RequestSearchResult({route, navigation}) {
    const {searchKey} = route.params;
    const onGoBack = route.params?.onGoBack;

    const [isLoading, setLoading] = useState(true);
    const [results, setResList] = useState([]);


    const closeResults = () => {
        setLoading(true);
        setResList([]);
        navigation.goBack();
    };


    useEffect(
        () => {
            if (isLoading) {
                searchQueryFood(searchKey, setResList, [])
                    .then(() => setLoading(false))
                    .catch((err) => console.log("Error querying:", err));
            }
        },
        [isLoading, searchKey, searchQueryFood]
    );
    return (
        <SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.resultStatInfo}>

                <Text style={styles.resultStatText}>
                    Searching for: "{searchKey}"
                </Text>

            </View>

            <View style={{flex: 19}}>

                {isLoading
                    ? <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="black"/>
                    </View>

                    : (results.length === 0)
                        ? <View style={styles.noResultsContainer}>

                            <View style={styles.resultStatInfo}>
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


function getResultItemElement(item, navigation, onGoBack) {
    const getKey = (name, objType) => name + "_" + objType + "_" + Math.floor(Math.random() * 10000);

    return (
        <View key={getKey(item.name, 'resultList')}>
            <FoodInfoContainer
                item={item}
                navigation={navigation}
                buttonType='lemmehelp'
                onPress={() =>
                    navigation.navigate("New Request", {
                        onGoBack: () => onGoBack(),
                        foodObj: item
                    })
                }
            />
        </View>
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
        marginTop: '0%',
        marginBottom: '0%',
        color: Colors.TEXT,
        fontStyle: "italic",
        justifyContent: "center",
    },

    resultLengthStatInfo: {
        // borderWidth: 1,
        marginTop: '0%',
        marginBottom: '0%',
        color: Colors.TEXT,
        fontStyle: "italic",
        justifyContent: "center",
    },

    resultStatText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        // paddingVertical: '1%',
        paddingBottom: '1%',
    },

    resultLengthStatText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        paddingBottom: '1%',
    },

    searchResults: {
        // paddingTop: 0,
        // marginHorizontal: '1%',
        marginTop: 10,
    },

    noResultText: {
        fontSize: Fonts.M,
        color: Colors.TEXT,
        fontStyle: "italic",
        fontWeight: "bold"
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

export default RequestSearchResult;
