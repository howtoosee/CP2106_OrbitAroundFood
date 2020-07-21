import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {Colors, Fonts} from "../constants";


function FoodInfoContainer(props) {
    const {item, navigation, isSaved, addFavHandler, removeFavHandler} = props;
    const useFavButton = props.useFavButton ? props.useFavButton : false;
    const onGoBack = props?.onGoBack ? props?.onGoBack : () => null;

    return (
        <View style={styles.searchResultContainer}>

            <View style={styles.searchResultInfoContainer}>

                <Text style={styles.searchResultKey}>
                    {item.name}
                </Text>

                <Text style={styles.searchResultPrice}>
                    {item.price}
                </Text>

                <Text style={styles.searchResultInfo}>
                    {item.store.store_name} ({item.store.location})
                </Text>

                <Text style={styles.searchResultInfo}>
                    {item.store.open_hours} - {item.store.close_hours}
                </Text>
            </View>

            {(!useFavButton)
                ? <View style={styles.detailsButtonContainer}>
                    <Button type='clear'
                            icon={
                                <Icon5
                                    name='chevron-right'
                                    size={30}
                                    color={Colors.BUTTON}
                                />
                            }
                            onPress={() => navigation.navigate('Food Details',
                                {
                                    foodObj: item,
                                    onGoBack: () => onGoBack()
                                })
                            }
                    />
                </View>
                : <View style={styles.favButtonContainer}>
                    <Button type='clear'
                            // title={isSaved ? 'Del' : 'Fav'}
                            icon={
                                <Icon
                                    name={isSaved ? 'heart' : 'heart-o'}
                                    size={30}
                                    color={Colors.BUTTON}
                                />
                            }
                            onPress={() => {
                                if (isSaved) {
                                    removeFavHandler();
                                } else {
                                    addFavHandler();
                                }
                                onGoBack();
                            }}
                    />
                </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    searchResultContainer: {
        marginTop: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER,
        borderRadius: 4,
        width: '97%',
        flexDirection: 'row',
    },

    searchResultInfoContainer: {
        flex: 10,
    },

    headerLineContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4
    },

    searchResultKey: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: "bold",
        paddingBottom: 4,
        marginBottom: 2,
        marginRight: 10,
    },

    searchResultPrice: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        fontWeight: "bold",
        paddingBottom: 4,
    },

    searchResultInfo: {
        color: Colors.TEXT,
        fontSize: Fonts.XS,
        paddingBottom: 4,
    },

    detailsButtonContainer: {
        flex: 4,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },

    favButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // borderWidth: 1,
    },
});

export default FoodInfoContainer;
