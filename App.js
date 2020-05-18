import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import Search from "./components/search";


export default function App() {
  const [searchItem, setSearchItem] = useState('');

  const searchInputHandler = input => setSearchItem(input);
  const addSearchHist = () => console.log(searchItem);

  return (
      <Search/>
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

