import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from "react-native";

import {Colors, DefaultStyles, Fonts} from "../../constants";
import searchQueryFood from "../../api/SearchApi";
import {SafeAreaView} from "react-native-safe-area-context";
import FoodInfoContainer from "../support-components/FoodInfoContainer";


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

            {isLoading
                ? <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="black"/>
                </View>

                : (results.length === 0)
                    ? <View style={styles.noResultsContainer}>

                        <View style={styles.searchResultInfo}>
                            <Text style={styles.noResultText}>
                                No results found :(
                            </Text>
                        </View>

                    </View>

                    : <View>

                        <View style={styles.resultStatInfo}>
                            <Text style={styles.resultStatText}>
                                Results found: {results.length}
                            </Text>
                        </View>

                        <ScrollView style={styles.searchResults}
                                    showsVerticalScrollIndicator={false}
                        >
                            {results.map((item) =>
                                getResultItemElement(item, navigation, onGoBack)
                            )}

                            <View style={styles.endOfResultsText}>

                                <Text style={styles.endOfResultsText}>
                                    No more liao!
                                </Text>

                            </View>
                        </ScrollView>

                    </View>
            }
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
        marginTop: 4,
        marginBottom: 4,
        color: Colors.TEXT,
        fontStyle: "italic"
    },

    resultStatText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.XS,
        fontWeight: 'bold',
    },


    noResultText: {
        fontSize: Fonts.M,
        color: Colors.TEXT,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    endOfResultsText: {
        fontSize: Fonts.XS,
        color: Colors.TEXT,
        fontStyle: 'italic',
        alignItems: 'center',
        // justifyContent: 'center'
    }
});

export default RequestSearchResult;
