import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import StartScreen from './screens/StartScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import SearchScreen from './screens/SearchScreen';
import SaveScreen from './screens/SaveScreen';

export default function App() {

  const [recScreen, setRecScreen] = useState(false);
  const [startScreen, setStartScreen] = useState(true);
  const [searchScreen, setSearchScreen] = useState(false);
  const [saveScreen, setSaveScreen] = useState(false);

  const showRecScreen = (boo) => {
    setRecScreen(boo);
    setStartScreen(false);
  }

  const showStartScreen = (boo) => {
    setStartScreen(boo);
    setRecScreen(false);
    setSearchScreen(false);
    setSaveScreen(false);
  }

  const showSearchScreen = (boo) => {
    setSearchScreen(boo);
    setStartScreen(false);
  }

  const showSaveScreen = (boo) => {
    setSaveScreen(boo);
    setStartScreen(false);
  }

  let content;

  if (recScreen && !startScreen) {
    content = <RecommendationScreen onPressBack={showStartScreen}/>
  } else if (!recScreen && startScreen && !searchScreen && !saveScreen) {
    content = <StartScreen onPressRec={showRecScreen} onPressSearch={showSearchScreen} onPressFav={showSaveScreen}/>
  } else if (searchScreen && !startScreen) {
    content = <SearchScreen onPressBack={showStartScreen}/>
  } else if (saveScreen && !startScreen) {
    content = <SaveScreen onPressBack={showStartScreen}/>
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
