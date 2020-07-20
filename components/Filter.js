import React, {useState} from 'react';
import {StyleSheet, Text, Button, View, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import {Colors, DefaultStyles, Fonts} from '../constants';
import DefaultHeader from "./DefaultHeader"


function Filter(props) {

    // local state functions. update locally before updating over-arching states
    const [filters, setFilters] = useState(props.filters);
    const [filterNames, setFilterNames] = useState(props.filterNames);

    const applyFilters = () => {
        props.setFilters(filters);
        props.setFilterNames(filterNames);
        props.setVisible(false);
    }


    return (
        <View style={DefaultStyles.screen}>

            <View style={DefaultStyles.contentContainer}>
                <SafeAreaView>

                    <DefaultHeader headerText="Filters"/>

                    <View style={styles.filterContainer}>
                        <FilterElement title="Halal"
                                       keyword="halal"
                                       filters={filters}
                                       setFilters={setFilters}
                                       filterNames={filterNames}
                                       setFilterNames={setFilterNames}
                        />

                        <FilterElement title="Vegetarian"
                                       keyword="vegetarian"
                                       filters={filters}
                                       setFilters={setFilters}
                                       filterNames={filterNames}
                                       setFilterNames={setFilterNames}
                        />

                        <FilterElement title="Healthier Choice"
                                       keyword="healthy"
                                       filters={filters}
                                       setFilters={setFilters}
                                       filterNames={filterNames}
                                       setFilterNames={setFilterNames}
                        />


                    </View>


                    <View style={styles.confirmButtonContainer}>
                        <Button title={filters.length === 0 ? "Back" : "Apply filters"}
                                color={Colors.BUTTON}
                                onPress={applyFilters}
                        />
                    </View>

                </SafeAreaView>
            </View>

        </View>
    );

}


function FilterElement(props) {
    const {title, keyword, filters, filterNames, setFilters, setFilterNames} = props;

    const [isAdded, setAdded] = useState(filters.includes(keyword));

    const addFilterHandler = () => {
        setFilters(filters.length === 0
            ? [keyword]
            : [...(filters.filter(item => item !== keyword)), keyword]);
        setFilterNames(filterNames.length === 0
            ? [title]
            : [...(filterNames.filter(item => item !== title)), title]);

        setAdded(true);
        // console.log("Filters:", filters);
    }

    const removeFilterHandler = () => {
        setFilters(filters.filter(item => item !== keyword));
        setFilterNames(filterNames.filter(item => item !== title));

        setAdded(false);
        // console.log("Filters:", filters);
    }

    return (
        <View style={styles.filterElement}>

            <View style={styles.filterElementTextContainer}>
                <Text style={styles.filterElementText}>{title}</Text>
            </View>

            <View style={styles.filterElementAddButtonContainer}>
                <Button title={isAdded ? "Remove" : "Add"}
                        color={Colors.BUTTON}
                        onPress={isAdded ? removeFilterHandler : addFilterHandler}
                        icon={
                            <Icon
                                name={isAdded ? "minus-circle" : "plus-circle"}
                                size={15}
                                color="Black"
                            />
                        }
                />
            </View>

        </View>
    );

}


const styles = StyleSheet.create({
    filterContainer: {
        // flex: 8,
        paddingTop: 50,
    },

    filterElement: {
        marginTop: 12,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: Colors.BORDER,
        borderRadius: 4,
        width: '97%',
        color: Colors.TEXT,
        flexDirection: "row",
    },

    filterElementTextContainer: {
        flex: 6,
        paddingLeft: 10,
        alignItems: "flex-start",
        justifyContent: "center",
    },

    filterElementText: {
        fontSize: Fonts.M,
        color: Colors.TEXT,

    },

    filterElementAddButtonContainer: {
        flex: 4,
        paddingRight: 10,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    confirmButtonContainer: {
        // flex: 2,
        paddingTop: 20,
    }
})


export default Filter;
