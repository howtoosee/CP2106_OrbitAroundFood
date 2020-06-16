import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LogInScreen from './components/LogInScreen';
import SignUpScreen from './components/SignUpScreen';
import Recommendation from './components/Recommendation';
import StartScreen from './components/StartScreen';
import Search from './components/search';
import Favourite from './components/Favourite';
import HelpBuyPls from './components/HelpBuyPls';
import Profile from './components/Profile';
import Home from './components/Home';

function App() {

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress
        }
    });

    const Stack = createStackNavigator();

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome" mode={Platform.OS === 'ios' ? "modal" : "card"}>
                    <Stack.Screen name="Welcome" component={StartScreen} />
                    <Stack.Screen name="Sign In" component={LogInScreen} options={{ cardStyleInterpolator: forFade }} />
                    <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ cardStyleInterpolator: forFade }} />
                    <Stack.Screen name="Search" component={Search} options={{ cardStyleInterpolator: forFade }} />
                    <Stack.Screen name="Recommendation" component={Recommendation} options={{ cardStyleInterpolator: forFade }} />
                    <Stack.Screen name="Favourite" component={Favourite} options={{ cardStyleInterpolator: forFade }} />
                    <Stack.Screen name="Profile" component={Profile} options={{ cardStyleInterpolator: forFade }} />
                    <Stack.Screen name="Lemme Help" component={HelpBuyPls} options={{ cardStyleInterpolator: forFade }} />
                    <Stack.Screen
                        name="Orbit Around Food"
                        component={Home}
                        options={{
                            headerLeft: null
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default App;