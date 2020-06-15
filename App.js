import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Recommendation from './components/Recommendation';
import StartScreen from './components/StartScreen';
import Search from './components/Search';
import Navigation from './components/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {

<<<<<<< Updated upstream


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
=======
    const Stack = createStackNavigator();
>>>>>>> Stashed changes


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
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="StartScreen">
                    <Stack.Screen name="StartScreen" component={StartScreen} />
                    <Stack.Screen name="LogIn" component={LogInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen name="Recommendation" component={Recommendation} />
                    <Stack.Screen name="Navigation" component={Navigation} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default App;