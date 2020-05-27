import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Recommendation from './components/Recommendation';
import Favourite from './components/Favourite';
import StartScreen from './components/StartScreen';
import Search from './components/Search';

import Screen from './constants/Screen';



export default function App() {

    const [currScreen, setCurrScreen] = useState(Screen.START_SCREEN);

    function showScreen(scrn) {
        let newScreen: any;

        switch (scrn) {
            case "favourite":
                newScreen = Screen.FAVOURITE;
                break;
            case "recommendation":
                newScreen = Screen.RECOMMENDATION;
                break;
            case "search":
                newScreen = Screen.SEARCH;
                break;
            case "start_screen":
                newScreen = Screen.START_SCREEN;
                break;
            default:
                newScreen = Screen.START_SCREEN;
                break;
        }
        setCurrScreen(newScreen);
    }



    let content;
    switch (currScreen) {
        case Screen.FAVOURITE:
            content = <Favourite onPressBack={() => showScreen('start_screen')}/>;
            break;
        case Screen.RECOMMENDATION:
            content = <Recommendation onPressBack={() => showScreen('start_screen')}/>;
            break;
        case Screen.SEARCH:
            content = <Search onPressBack={() => showScreen('start_screen')}/>;
            break;
        case Screen.START_SCREEN:
            content = <StartScreen onPressRec = {() => showScreen('recommendation')}
                                   onPressSearch = {() => showScreen('search')}
                                   onPressFav = {() => showScreen('favourite')}/>
            break;
        default:
            content = <StartScreen onPressRec = {() => showScreen('recommendation')}
                                   onPressSearch = {() => showScreen('search')}
                                   onPressFav = {() => showScreen('favourite')}/>
            break;

    }


    // if (recScreen && !startScreen) {
    //     content = <Recommendation onPressBack={showStartScreen}/>
    // } else if (!recScreen && startScreen && !searchScreen && !saveScreen) {
    //     content = <StartScreen onPressRec={showRecScreen} onPressSearch={showSearch} onPressFav={showSaveFavourite}/>
    // } else if (searchScreen && !startScreen) {
    //     content = <Search onPressBack={showStartScreen}/>
    // } else if (saveScreen && !startScreen) {
    //     content = <SaveFavourite onPressBack={showStartScreen}/>
    // }


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
