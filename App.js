import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthSession } from 'expo';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
import TodoScreen from './Components/TodoScreen';
import Input from './Components/Input';
import TodoCollectionList from './Components/TodoCollectionList';
import SignOutButton from './Components/SignOutButton';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { _confirmProps } from 'react-native/Libraries/Modal/Modal';
import { UserInterfaceIdiom } from 'expo-constants';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from "aws-amplify-react-native"
Amplify.configure(awsconfig);


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

function TodoCollectionsScreen(props) {
  const [todoCollectionIds, setTodoCollectionIds] = useState([]);
  const [todoCollections, setTodoCollections] = useState([]);
  const [userId, setUserId] = useState('1234');

  useEffect(() => {
    getTodoCollectionIds();
    let getUser = async function() {
      let user = await Auth.currentAuthenticatedUser();
      console.log('user: ', user.attributes);
    }
    getUser();
  }, [])
  
  useEffect(() => {
    getTodoCollections(todoCollectionIds);
  }, [todoCollectionIds])
  
  const getTodoCollectionIds = function() {
    return db.collection('users').doc(userId)
      .onSnapshot(function(doc) {
      setTodoCollectionIds(doc.data().todoCollections.reverse())
    })
  }

  const getTodoCollectionById = function(id, callback) {
    db.collection('todoCollections').doc(id)
      .onSnapshot(function(doc){
      callback(doc.data())
    })
  }

  const getTodoCollections = function(ids) {
    setTodoCollections([])
    const getTodoCollectionById = function(id, callback) {
      db.collection('todoCollections').doc(id)
        .get().then(function(doc){
        callback({id: doc.id, data: doc.data()})
      })
    }
    ids.forEach(function(id) {
      getTodoCollectionById(id, (todoCollection) => {setTodoCollections(prevState => [...prevState, todoCollection])})
    })
  }

  const getTodos = function(id) {
    setTodos([])
    const getTodoById = function(id, callback) {
      db.collection('todos').doc(id)
        .get().then(function(doc){
        callback({id: doc.id, data: doc.data()})
      })
    }
    ids.forEach(function(id) {
      getTodoCollectionById(id, (todoCollection) => {setTodoCollections(prevState => [...prevState, todoCollection])})
    })
  }

  const updateTextValue = function(text) {
    setTextValue(text)
  }

  const deleteTodo = function(todoCollectionId, todo) {
    db.collection('todoCollections').doc(todoCollectionId).update({
      todos: firebase.firestore.FieldValue.arrayRemove(todo)
    });
  }

  // const addTodo = function(value) {
  //   db.collection('todoCollections').doc(id).update({todos: firebase.firestore.FieldValue.arrayUnion(value)
  // })
  // }

  const addTodoCollection = function(value) {
    db.collection('todoCollections').add({name: value, createdBy: userId, todos: []})
    .then(function(collectionRef) {
      db.collection('users').doc(userId).update({
        todoCollections: firebase.firestore.FieldValue.arrayUnion(collectionRef.id)
      })
    })
  }

  const addTodo = function(id, todo) {
    db.collection('todoCollections').doc(id).update({
      todos: firebase.firestore.FieldValue.arrayUnion(todo)
    })
  }

  const deleteTodoCollection = function(id) {
    db.collection('todoCollections').doc(id).delete();
    db.collection('users').doc(userId).update({
      todoCollections: firebase.firestore.FieldValue.arrayRemove(id)
    })
  }

  return (
    <View style={styles.container}>
      <Input addToDB={addTodoCollection} placeholder={'Add New List'}></Input>
      <TodoCollectionList todoCollections={todoCollections} deleteTodoCollection={deleteTodoCollection} deleteTodo={deleteTodo} addTodo={addTodo} getTodoCollectionById={getTodoCollectionById} navigation={props.navigation}></TodoCollectionList>
      {/*<TodoList todos={todos} textValue={textValue} updateTextValue={updateTextValue} deleteTodo={deleteTodo} addTodo={addTodo} ></TodoList>*/}
    </View>
  );
}

const AppNavigator = createStackNavigator(
  {
  TodoCollectionsScreen: {
    screen: TodoCollectionsScreen,
    navigationOptions: ({screenProps}) => ({
      title: `My Lists`,
      headerRight: (
        <Button onPress={() => Auth.signOut().then(data => screenProps.signOut())
            .catch(err => console.log(err))} title='Sign Out' />
      )
    }),
  },
  TodoScreen: {
    screen: TodoScreen,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.todoCollection.data.name,
      headerRight: (
        <Button onPress={() => props.rerender()} title='Sign Out' />
      )
    }),
  },
  // defaultNavigationOptions: {
  //   headerRight: (
  //     <Button onPress={() => Auth.signOut().then(data => forceUpdate())
  //         .catch(err => console.log(err))} title='Sign Out' />
  //   )
  // },
},
{
  initialRouteName: 'TodoCollectionsScreen',
})

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    //remove user credentials and redirect to sign in page
    Auth.signOut()
    .then(() => this.props.onStateChange('signedOut'))
    .catch(err => console.log(err));
  }
  render() {
    return <AppContainer screenProps={{signOut: this.signOut}}/>;
  }
}

export default withAuthenticator(App, false);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
