import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ToDoList from './Components/ToDoList';

export default function App() {
  const dummyData = [{key: '123', text: 'get tickets'}, {key: '456', text: 'get ride'},{key: '789', text: 'get help'}]
  return (
    <View style={styles.container}>
      <ToDoList data={dummyData}></ToDoList>
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
