import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {
    Favourite,
    HelpBuyPls,
    Home,
    LogInScreen,
    Profile,
    Recommendation,
    Search,
    SearchResults,
    SignUpScreen,
    StartScreen
} from './components';

import {Platform} from "react-native";


export default function App() {

// <<<<<<< HEAD
//
// export default function App() {
//
//     const [currScreen, setCurrScreen] = useState(Screen.START_SCREEN);
//     const [searchHist, setSearchHist] = useState([]);
//
//     function showScreen(scrn) {
//         let newScreen: any;
//
//         switch (scrn) {
//             case "favourite":
//                 newScreen = Screen.FAVOURITE;
//                 break;
//             case "recommendation":
//                 newScreen = Screen.RECOMMENDATION;
//                 break;
//             case "search":
//                 newScreen = Screen.SEARCH;
//                 break;
//             case "start_screen":
//                 newScreen = Screen.START_SCREEN;
//                 break;
//             default:
//                 newScreen = Screen.START_SCREEN;
//                 break;
//         }
//         setCurrScreen(newScreen);
//     }
//
//
//     let content;
//     switch (currScreen) {
//         case Screen.FAVOURITE:
//             content = <Favourite onPressBack={() => showScreen('start_screen')}/>;
//             break;
//         case Screen.RECOMMENDATION:
//             content = <Recommendation onPressBack={() => showScreen('start_screen')}/>;
//             break;
//         case Screen.SEARCH:
//             content = <Search onPressBack={() => showScreen('start_screen')}
//                               searchHistory={searchHist}
//                               setSearchHistory={setSearchHist}/>;
//             break;
//         case Screen.START_SCREEN:
//             content = <StartScreen onPressRec={() => showScreen('recommendation')}
//                                    onPressSearch={() => showScreen('search')}
//                                    onPressFav={() => showScreen('favourite')}/>
//             break;
//         default:
//             content = <StartScreen onPressRec={() => showScreen('recommendation')}
//                                    onPressSearch={() => showScreen('search')}
//                                    onPressFav={() => showScreen('favourite')}/>
//             break;
//
//     }
//
// =======

    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress
        }
    });

    const Stack = createStackNavigator();

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome"
                                 mode={Platform.OS === 'ios' ? "modal" : "card"}>
                    <Stack.Screen name="Welcome"
                                  component={StartScreen}
                    />
                    <Stack.Screen name="Sign In"
                                  component={LogInScreen}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="Sign Up"
                                  component={SignUpScreen}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="Search"
                                  component={Search}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="SearchResults"
                                  component={SearchResults}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="Recommendation"
                                  component={Recommendation}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="Favourite"
                                  component={Favourite}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="Profile"
                                  component={Profile}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="Lemme Help"
                                  component={HelpBuyPls}
                                  options={{cardStyleInterpolator: forFade}}
                    />
                    <Stack.Screen name="Orbit Around Food"
                                  component={Home}
                                  options={{headerLeft: null}}

                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );

}
