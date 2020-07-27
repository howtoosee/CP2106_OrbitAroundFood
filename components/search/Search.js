import React, {useState} from 'react';
import {
    Alert,
    Button,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Button as ButtonRNE} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Colors, DefaultStyles, Fonts} from '../../constants';
import Filter from './Filter';
import {addHistory, clearHistory, getHistory} from '../../api/SearchHistoryLogic';
import DismissKeyboardView from "../support-components/DismissKeyboardView";


function Search({navigation}) {
    const [searchString, setSearchString] = useState('');
    const [searchHist, setSearchHist] = useState(getHistory());

    const [isFilterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState([]);
    const [filterNames, setFilterNames] = useState([]);

    const searchInputHandler = (inputStr) => {
        setSearchString(inputStr);
    }

    const searchHandler = () => {
        if (isValidString(searchString)) {
            addSearchHistHandler();
            setSearchString('');

            navigation.navigate('Search Results',
                {
                    searchKey: searchString,
                    filters: filters,
                    filterNames: filterNames
                }
            );
        }
        // else ignore the search string
    }

    const filterHandler = () => {
        setFilterVisible(true);
    }

    const isValidString = str => {
        const ENGLISH_CHAR_PLUS_STRING = /^[A-Za-z ]+$/;

        if (str.length === 0 || str.trim().length === 0) {
            return false;
        } else if (!str.match(ENGLISH_CHAR_PLUS_STRING)) {
            Alert.alert('Invalid key',
                'Please enter English characters only!',
                [{ text: 'Dismiss'}]
            );
            return false;
        } else {
            return true;
        }
    }
    // checks if string is valid

    const addSearchHistHandler = () => {
        addHistory(searchString);
        setSearchHist(getHistory());
    };

    const clearSearchHistHandler = () => {
        clearHistory();
        setSearchHist(getHistory());
    }

    const getKey = objType => objType + "_" + Math.floor(Math.random() * 10000);
    // creates key for object


    return (

        <SafeAreaView style={DefaultStyles.screen}>

            <DismissKeyboardView style={{flex: 1, marginHorizontal: '1%'}}>

                <Modal animationType="slide"
                       transparent={false}
                       visible={isFilterVisible}>
                    <Filter filters={filters}
                            filterNames={filterNames}
                            setFilters={setFilters}
                            setFilterNames={setFilterNames}
                            setVisible={setFilterVisible}
                    />
                </Modal>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Search for what you wanna eat:</Text>
                </View>

                <View style={styles.searchBar}>

                    <View style={styles.inputContainer}>

                        <TextInput style={styles.inputText}
                                   placeholder="What do you wanna eat?"
                                   onChangeText={searchInputHandler}
                                   value={searchString}
                        />

                    </View>

                    <View style={styles.searchButton}>
                        <ButtonRNE type='clear'
                                   icon={
                                       <Icon name="search"
                                             size={25}
                                             color={Colors.BUTTON}
                                       />
                                   }
                                   color={Colors.BUTTON}
                                   onPress={searchHandler}
                        />
                    </View>

                    <View style={styles.filterButton}>
                        <ButtonRNE type='clear'
                                   icon={
                                       <Icon name="filter"
                                             size={25}
                                             color={Colors.BUTTON}
                                       />
                                   }
                                   color={Colors.BUTTON}
                                   onPress={filterHandler}
                        />
                    </View>


                </View>


                <View style={styles.searchHistoryOverallContainer}>

                    <View style={styles.searchHistoryTitle}>
                        <Text style={styles.searchHistoryTitleText}>
                            Search History
                        </Text>
                    </View>

                    <View style={styles.searchHistoryContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {searchHist.map(item => (

                                <TouchableOpacity
                                    key={getKey("touchable_opacity")}
                                    onPress={() => searchInputHandler(item)}>

                                    <View style={styles.searchHistoryTextContainer}>
                                        <Text style={styles.searchHistoryText}
                                              key={getKey("search_hist")}>
                                            {item}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            ))
                            }

                        </ScrollView>
                    </View>


                </View>

                <View style={styles.searchHistoryClearButton}>
                    <Button title="Clear search history"
                            color={Colors.BUTTON}
                            onPress={clearSearchHistHandler}
                    />
                </View>

            </DismissKeyboardView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    headerTextContainer: {
        // paddingLeft: 20,
        flex: 1,
    },

    headerText: {
        color: Colors.TEXT,
        fontSize: Fonts.S,
        fontWeight: 'bold',
    },

    searchBar: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    filterButton: {
        flex: 2,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    searchButton: {
        flex: 2,
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },

    inputContainer: {
        flex: 10,
        // borderWidth: 2,
        marginLeft: '1%',
        borderBottomWidth: 2,
        borderColor: Colors.BORDER,
        borderRadius: 0,
        paddingHorizontal: '1%',
        paddingVertical: '2%',
        // borderWidth: 1,
    },

    inputText: {
        fontSize: Fonts.XS,
        height: '50%',
        width: '100%',
    },

    searchHistoryOverallContainer: {
        flex: 18,
        // paddingTop: 10,
    },

    searchHistoryContainer: {
        flex: 18,
        marginTop: '2%',
        paddingHorizontal: '1%',
        justifyContent: 'space-around'
    },

    searchHistoryTitle: {
        flex: 1,
        marginTop: '3%',
        // borderWidth: 1
    },

    searchHistoryTitleText: {
        color: Colors.DARK_TEXT,
        fontSize: Fonts.S,
        fontWeight: 'bold',
        paddingBottom: '3%',
    },


    searchHistoryText: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: Fonts.XS,
        color: Colors.TEXT,
    },

    searchHistoryTextContainer: {
        marginVertical: '2%',
        // marginHorizontal: '4%',
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        borderWidth: 1,
        borderColor: Colors.LIGHT_BORDER,
        borderRadius: 4,
        width: '95%',
        color: Colors.TEXT,
    },

    searchHistoryClearButton: {
        flex: 4,
        marginTop: 0,
        justifyContent: 'center',
    }
});


export default Search;
