import React, { useState } from 'react';
import { StyleSheet, Text, Textinput, View, Button } from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState("Hello, welcome to OrbitAroundFood!")
  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button title = "Click me!" onPress={() => setOutputText("Let's get started!")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

