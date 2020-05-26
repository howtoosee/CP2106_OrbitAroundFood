import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import StartScreen from './components/StartScreen';
import Recommendation from './components/Recommendation';
import Search from './components/Search';
import SaveFavourite from './components/SaveFavourite';


export default function App() {

    const [recScreen, setRecScreen] = useState(false);
    const [startScreen, setStartScreen] = useState(true);
    const [searchScreen, setSearch] = useState(false);
    const [saveScreen, setSaveFavourite] = useState(false);


    const showRecScreen = (boo) => {
        setRecScreen(boo);
        setStartScreen(false);
    }

    const showStartScreen = (boo) => {
        setStartScreen(boo);
        setRecScreen(false);
        setSearch(false);
        setSaveFavourite(false);
    }


    const showSearch = (boo) => {
        setSearch(boo);
        setStartScreen(false);
    }


    const showSaveFavourite = (boo) => {
        setSaveFavourite(boo);
        setStartScreen(false);
    }


    let content;

    if (recScreen && !startScreen) {
        content = <Recommendation onPressBack={showStartScreen}/>
    } else if (!recScreen && startScreen && !searchScreen && !saveScreen) {
        content = <StartScreen onPressRec={showRecScreen} onPressSearch={showSearch} onPressFav={showSaveFavourite}/>
    } else if (searchScreen && !startScreen) {
        content = <Search onPressBack={showStartScreen}/>
    } else if (saveScreen && !startScreen) {
        content = <SaveFavourite onPressBack={showStartScreen}/>
    }


    return (
        <View style={styles.screen}>
            {content}
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
