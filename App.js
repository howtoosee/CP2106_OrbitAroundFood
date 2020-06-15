import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogInScreen from './components/LogInScreen';
import SignUpScreen from './components/LogInScreen';
import Recommendation from './components/Recommendation';
import StartScreen from './components/StartScreen';
import Search from './components/search';
import Navigation from './components/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {

    const Stack = createStackNavigator();

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