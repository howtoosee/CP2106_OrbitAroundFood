import React, {useState} from 'react';
import {StyleSheet, View, Button, Text, ScrollView} from 'react-native';

import FoodInfoContainer from "./FoodInfoContainer";
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
        <FoodInfoContainer
            key={getKey(item.name, 'favsList')}
            item={item}
            navigation={navigation}
            onGoBack={refresh}
        />
        // <View style={styles.searchResultContainer} key={getKey(item.name, 'favsList')}>
        //
        //     <View style={styles.searchResultInfoContainer}>
        //         <View style={{
        //             flexDirection: 'row',
        //             justifyContent: 'flex-start',
        //             alignItems: 'center',
        //             marginBottom: 4
        //         }}>
        //
        //             <Text style={styles.searchResultKey}>
        //                 {item.name}
        //             </Text>
        //
        //             <Text style={styles.searchResultInfo}>
        //                 ({item.price})
        //             </Text>
        //         </View>
        //
        //         <Text style={styles.searchResultInfo}>
        //             {item.store.store_name} ({item.store.location})
        //         </Text>
        //
        //         <Text style={styles.searchResultInfo}>
        //             {item.store.open_hours} - {item.store.close_hours}
        //         </Text>
        //     </View>
        //
        //     <View style={styles.detailsButtonContainer}>
        //         <Button title={'More'}
        //                 titleStyle={styles.detailsButton}
        //                 color={Colors.BUTTON}
        //                 onPress={() => {
        //                     navigation.navigate('Food Details',
        //                         {
        //                             foodObj: item,
        //                             onGoBack: () => refresh()
        //                         });
        //                 }
        //                 }
        //         />
        //     </View>
        //
        // </View>
    );
}


const styles = StyleSheet.create({

    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
    },

    headerText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: 'bold',
    },

    contentContainer: {
        flex: 29,
    },

    emptyFavContainer: {
        flex: 1,
        // marginTop: '20%',
        marginBottom: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    noFavText: {
        fontSize: Fonts.S,
        color: Colors.TEXT,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    searchResultContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
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
        paddingBottom: 4,
        marginRight: 10,
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        paddingBottom: 4,
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
