import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
const dotenv = require('dotenv');
dotenv.config();
import { SQLite } from 'expo-sqlite';
import ToDoList from './Components/ToDoList';

//const db = SQLite.openDatabase('db.db');

export default function App() {
  const [todos, setTodos] = useState(['hi']);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'create table if not exists todos (id integer primary key not null, text text);'
    //   );
    // });
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'SELECT * FROM todos',
    //     [],
    //     (_, res) => {
    //       setTodos(res.rows._array);

    //     }
    //   );
    // })
    console.log(process.env.firebaseConfig)
  }, [])

  const updateTextValue = function(text) {
    setTextValue(text)
  }

  const deleteTodo = function(id) {
    setTextValue('');
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DELETE FROM todos WHERE ID = ?',
    //     [id],
    //     (s, c) => console.log(s,c),
    //     (e, r) => console.log(e,r)
    //   )
    // })
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'SELECT * FROM todos',
    //     [],
    //     (_, res) => {
    //       setTodos(res.rows._array);

    //     }
    //   );
    // })
  }

  const addTodo = function() {
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'INSERT INTO todos (text) VALUES (?);',
    //     [textValue],
    //     (s, c) => console.log(s, c),
    //     (e, er) => {console.log(e, er)}
    //   );
    // });
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'SELECT * FROM todos',
    //     [],
    //     (_, res) => {
    //       setTodos(res.rows._array);

    //     }
    //   );
    // })
  }
  return (
    <View style={styles.container}>
      <ToDoList todos={todos} textValue={textValue} updateTextValue={updateTextValue} deleteTodo={deleteTodo} addTodo={addTodo} ></ToDoList>
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
