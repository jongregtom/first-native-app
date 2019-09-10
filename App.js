import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthSession } from 'expo';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
import Input from './Components/Input';
import TodoCollectionList from './Components/TodoCollectionList';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { _confirmProps } from 'react-native/Libraries/Modal/Modal';
import { UserInterfaceIdiom } from 'expo-constants';

//const db = SQLite.openDatabase('db.db');

firebaseConfig = {
  apiKey: "AIzaSyDNAI2TIJUDUYk-MLrV30HeQ5-lXWgqzO4",
  authDomain: "todo-e0d69.firebaseapp.com",
  databaseURL: "https://todo-e0d69.firebaseio.com",
  projectId: "todo-e0d69",
  storageBucket: "todo-e0d69.appspot.com",
  messagingSenderId: "1091186655993",
  appId: "1:1091186655993:web:62b1580b8114cf74"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function Home() {
  const [todoCollectionIds, setTodoCollectionIds] = useState([]);
  const [todoCollections, setTodoCollections] = useState([]);
  const [todos, setTodos] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [userId, setUserId] = useState('1234');

  useEffect(() => {
    getTodoCollectionIds();
  
  }, [])

  useEffect(() => {
    console.log('new collections: ', todoCollections)
  }, [todoCollections])
  
  useEffect(() => {
    console.log('tcIDState:', todoCollectionIds)
    getTodoCollections(todoCollectionIds);
    
  }, [todoCollectionIds])
  
  const getTodoCollectionIds = function() {
    console.log('this ran')
    return db.collection('users').doc(userId)
      .onSnapshot(function(doc) {
      setTodoCollectionIds(doc.data().todoCollections)
    })
  }

  const getTodoCollections = function(ids) {
    setTodoCollections([])
    console.log('ids: ', ids)
    const getTodoCollectionById = function(id, callback) {
      db.collection('todoCollections').doc(id)
        .get().then(function(doc){
        callback({id: doc.id, data: doc.data()})
      })
    }
    console.log(ids)
    ids.forEach(function(id) {
      getTodoCollectionById(id, (todoCollection) => {setTodoCollections(prevState => [...prevState, todoCollection])})
    })
  }

  const updateTextValue = function(text) {
    setTextValue(text)
  }

  const deleteTodo = function(id) {
    db.collection('todos').doc(id).delete();
  }

  const addTodo = function() {
    db.collection('todos').add({todo: textValue})
  }

  const addTodoCollection = function(value) {
    db.collection('todoCollections').add({name: value, createdBy: userId, todos: []})
    .then(function(collectionRef) {
      db.collection('users').doc(userId).update({
        todoCollections: firebase.firestore.FieldValue.arrayUnion(collectionRef.id)
      })
    })
  }

  const deleteTodoCollection = function(id) {
    db.collection('todoCollections').doc(id).delete();
    db.collection('users').doc(userId).update({
      todoCollections: firebase.firestore.FieldValue.arrayRemove(id)
    })
  }

  // const getTodoCollections = async function(userId) {
  //   let todoCollectionIds;
  //   await db.collection('users').doc(userId)
  //     .get().then(function(doc) {
  //       //setTodoCollections(doc.data().todoCollections)
  //       todoCollectionIds = (doc.data().todoCollections);
  //   })
  //   const getTodoCollectionById = function(id, callback) {
  //     db.collection('todoCollections').doc(id)
  //       .get().then(function(doc){
  //       callback({id: doc.id, data: doc.data()})
  //     })
  //   }
  //   todoCollectionIds.forEach(function(id) {
  //     getTodoCollectionById(id, (todoCollection) => {setTodoCollections(prevState => [...prevState, todoCollection])})
  //   })
  // }

  return (
    <View style={styles.container}>
      <Input addToDB={addTodoCollection} placeholder={'Add New Collection'}></Input>
      <TodoCollectionList todoCollections={todoCollections} deleteTodoCollection={deleteTodoCollection}></TodoCollectionList>
      {/*<TodoList todos={todos} textValue={textValue} updateTextValue={updateTextValue} deleteTodo={deleteTodo} addTodo={addTodo} ></TodoList>*/}
    </View>
  );
}

const AppNavigator = createStackNavigator({
  Home: Home,
},
{
  initialRouteName: 'Home',
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
