import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import {Colors, DefaultStyles, Fonts} from '../../constants';


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
        < SafeAreaView style={DefaultStyles.screen}>

            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Filters</Text>
            </View>

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
    }

    const removeFilterHandler = () => {
        setFilters(filters.filter(item => item !== keyword));
        setFilterNames(filterNames.filter(item => item !== title));

        setAdded(false);
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
    headerTextContainer: {
        marginVertical: 20,
        // flex: 1,
    },

    headerText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: 'bold',
    },

    filterContainer: {
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    filterElement: {
        marginTop: 12,
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: Colors.LIGHT_BORDER,
        borderRadius: 4,
        width: '100%',
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
        color: Colors.DARK_TEXT,
    },

    filterElementAddButtonContainer: {
        flex: 4,
        paddingRight: 10,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    confirmButtonContainer: {
        paddingTop: 20,
    }
})


export default Filter;
