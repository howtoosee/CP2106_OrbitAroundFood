import React, {useState} from 'react';
import {StyleSheet, View, Button, Text, ScrollView} from 'react-native';


import {Colors, Fonts, DefaultStyles} from '../constants';

import {readFavourites} from "../api/FavouritesLogic";


function Favourite({navigation}) {

    const [favsArr, setFavsArr] = useState(readFavourites());

    const refresh = () => setFavsArr(readFavourites());

    return (
        <View style={DefaultStyles.screen}>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Saved favourites:</Text>
            </View>

            <View style={styles.contentContainer}>
            {(favsArr.length === 0)
                ? <View style={styles.emptyFavContainer}>
                    <Text style={styles.noFavText}>No favourites yet :(</Text>
                </View>


                : <ScrollView>
                    {
                        favsArr.map(item => getFavsItemElement(item, navigation, refresh))
                    }
                </ScrollView>
            }
            </View>


        </View>
    );

}


function getFavsItemElement(item, navigation, refresh) {
    const getKey = (name, objType) => name + '_' + objType + "_" + Math.floor(Math.random() * 10000);

    return (
        <View style={styles.searchResultContainer} key={getKey(item.name, 'favsList')}>

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
                        onPress={() => {
                            navigation.navigate('Food Details',
                                {
                                    foodObj: item,
                                    onGoBack: () => refresh()
                                });
                        }
                        }
                />
            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    headerText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
    },

    contentContainer: {
        flex: 29,
    },

    emptyFavContainer: {
        flex: 1,
        paddingTop: '10%',
        paddingBottom: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    noFavText: {
        fontSize: Fonts.S,
        color: Colors.TEXT,
    },

    searchResultContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: Colors.BORDER,
        borderRadius: 4,
        width: '97%',
        color: Colors.TEXT,
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
});


export default Favourite;
