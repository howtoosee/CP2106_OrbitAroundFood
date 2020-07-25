import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import FoodInfoContainer from "../support-components/FoodInfoContainer";
import {Colors, DefaultStyles, Fonts} from '../../constants';
import {readFavourites} from "../../api/FavouritesLogic";


function Favourite({navigation}) {

    const [favsArr, setFavsArr] = useState(readFavourites());

    const refresh = () => {
        setFavsArr(readFavourites())
    }

    return (
        <SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Saved favourites:</Text>
            </View>

            <View style={styles.contentContainer}>
                {(favsArr.length === 0)
                    ? <View style={styles.emptyFavContainer}>
                        <Text style={styles.noFavText}>No favourites yet :(</Text>
                    </View>


                    : <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            favsArr.map(item => getFavsItemElement(item, navigation, refresh))
                        }
                    </ScrollView>
                }
            </View>

        </SafeAreaView>
    );

}


function getFavsItemElement(item, navigation, refresh) {
    const getKey = (name, objType) => name + '_' + objType + "_" + Math.floor(Math.random() * 10000);

    return (
        <FoodInfoContainer
            key={getKey(item.name, 'favsList')}
            item={item}
            navigation={navigation}
            buttonType={'details'}
            onGoBack={refresh}
        />
    );
}


const styles = StyleSheet.create({

    headerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // marginVertical: '1%',
        // borderWidth: 1,
    },

    headerText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: 'bold',
    },

    contentContainer: {
        flex: 19,
    },

    emptyFavContainer: {
        flex: 1,
        // marginTop: '20%',
        // marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    noFavText: {
        fontSize: Fonts.S,
        color: Colors.TEXT,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
});


export default Favourite;
