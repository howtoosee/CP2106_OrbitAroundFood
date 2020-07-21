import React from "react";
import {Button, Text, View, StyleSheet} from "react-native";
import {Colors, Fonts} from "../constants";


function FoodInfoContainer(props) {
    const {item, navigation, isSaved, addFavHandler, removeFavHandler} = props;
    const useFavButton = props.useFavButton ? props.useFavButton : false;
    const onGoBack = props?.onGoBack ? props?.onGoBack : () => null;

    return (
        <View style={styles.searchResultContainer}>

            <View style={styles.searchResultInfoContainer}>
                <View style={styles.headerLineContainer}>

                    <Text style={styles.searchResultKey}>
                        {item.name}
                    </Text>

                    <Text style={styles.searchResultInfo}>
                        ({item.price})
                    </Text>
                </View>

                <Text style={styles.searchResultInfo}>
                    {item.store.store_name} ({item.store.location})
                </Text>

                <Text style={styles.searchResultInfo}>
                    {item.store.open_hours} - {item.store.close_hours}
                </Text>
            </View>

            {(!useFavButton)
                ? <View style={styles.detailsButtonContainer}>
                    <Button title={'More'}
                            color={Colors.BUTTON}
                            onPress={() => navigation.navigate('Food Details',
                                {
                                    foodObj: item,
                                    onGoBack: () => onGoBack()
                                }
                            )
                            }
                    />
                </View>
                : <View style={styles.favButtonContainer}>
                    <Button title={isSaved ? 'Del' : 'Fav'}
                            color={Colors.BUTTON}
                            onPress={isSaved ? removeFavHandler : addFavHandler}
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
        marginRight: 10,
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
