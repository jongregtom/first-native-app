import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthSession } from 'expo';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
import TodoScreen from './Components/TodoScreen';
import Input from './Components/Input';
import TodoCollectionList from './Components/TodoCollectionList';
import AddUserScreen from './Components/AddUserScreen';
import SignOutButton from './Components/SignOutButton';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { _confirmProps } from 'react-native/Libraries/Modal/Modal';
import { UserInterfaceIdiom } from 'expo-constants';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from "aws-amplify-react-native"
Amplify.configure(awsconfig);

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
  const [todoIds, setTodoIds] = useState([]);
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [userQuery, setUserQuery] = useState([]);

  useEffect(() => {
    getUser()
      .then(user => setUser(user))
  }, [])

  useEffect(() => {
    if (user != null) getTodoCollectionIds(user.id)
  }, [user])
  
  useEffect(() => {
    getTodoCollections(todoCollectionIds);
  }, [todoCollectionIds])

  useEffect(() => {
    console.log('UQ', userQuery)
  }, [userQuery])

  const getUser = async function() {
    const authUser = await Auth.currentAuthenticatedUser();
    const { payload } = authUser.signInUserSession.idToken;
    const userData = {id: payload.aud, 
      username: payload['cognito:username'], 
      email: payload.email
    }
    //check if user exists in DB
    const dbUser = await db.collection('users').doc(userData.id).get().then(function(doc) {
      if (doc.exists) {
        return userData
      } else {
        //create user in DB
        db.collection('users').doc(userData.id).set({
          username: userData.username,
          email: userData.email,
          todoCollections: []
        })
      }
    })
    return userData
  }
  
  const getTodoCollectionIds = function(userId) {
    return db.collection('users').doc(userId)
      .onSnapshot(function(doc) {
      const ids = doc.data().todoCollections;
      setTodoCollectionIds(ids.reverse())
    })
  }

  const getTodoIds = function(id) {
    return db.collection('todoCollections').doc(id)
      .onSnapshot(function(doc) {
      setTodoIds(doc.data().todos.reverse())
    })
  }

  const getTodoCollectionById = function(id, callback) {
    db.collection('todoCollections').doc(id)
      .onSnapshot(function(doc){
      callback(doc.data())
    })
  }

  const getTodoById = function(id, callback) {
    db.collection('todos').doc(id)
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
    const getTodoById = function(id, callback) {
      db.collection('todos').doc(id)
        .onSnapshot(function(doc){
        callback({id: doc.id, data: doc.data()})
      })
    }
    const getTodoIds = db.collection('todoCollections').doc(id)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.data().todos.forEach(function(id) {
          getTodoById(id, (todo) => {setTodos(prevState => [...prevState, todo])})
        })
      })
  }

  const updateTextValue = function(text) {
    setTextValue(text)
  }

  const deleteTodo = function(todoCollectionId, todoId) {
    db.collection('todoCollections').doc(todoCollectionId).update({
      todos: firebase.firestore.FieldValue.arrayRemove(todoId)
    });
    db.collection('todos').doc(todoId).delete();
  }

  const addTodoCollection = function(value) {
    db.collection('todoCollections').add({name: value, createdBy: user.id, todos: []})
    .then(function(collectionRef) {
      db.collection('users').doc(user.id).update({
        todoCollections: firebase.firestore.FieldValue.arrayUnion(collectionRef.id)
      })
    })
  }

  const addTodo = function(id, todo) {
    db.collection('todos').add(todo)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      db.collection('todoCollections').doc(id).update({
        todos: firebase.firestore.FieldValue.arrayUnion(docRef.id)
      })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  const deleteTodoCollection = function(id) {
    db.collection('todoCollections').doc(id).delete();
    db.collection('users').doc(user.id).update({
      todoCollections: firebase.firestore.FieldValue.arrayRemove(id)
    })
  }

  const changeTodoStatus = function(id, status) {
    db.collection('todos').doc(id).update({completed: status})
  }

  const searchUsers = async function(text) {
    await db.collection('users').where('username', '==', text)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            setUserQuery(prevState => [...prevState, {id: doc.id,  data: doc.data()}])
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    await db.collection('users').where('email', '==', text)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            setUserQuery(prevState => [...prevState, {id: doc.id,  data: doc.data()}])
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  return (
    <View style={styles.container}>
      <Input style={styles.input} addToDB={addTodoCollection} placeholder={'Create New List'}></Input>
      <TodoCollectionList 
        style={styles.list}
        todoCollections={todoCollections} 
        db={db} 
        getTodos={getTodos}
        deleteTodoCollection={deleteTodoCollection} 
        deleteTodo={deleteTodo} 
        addTodo={addTodo} 
        getTodoCollectionById={getTodoCollectionById} 
        navigation={props.navigation} 
        changeTodoStatus={changeTodoStatus}
        searchUsers={searchUsers}
        userQuery={userQuery}>
      </TodoCollectionList>
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
        <Button onPress={() => screenProps.signOut()} title='Sign Out' />
      )
    }),
  },
  TodoScreen: {
    screen: TodoScreen,
    navigationOptions: ({screenProps, navigation}) => ({
      title: navigation.state.params.todoCollection.data.name,
      headerRight: (
        <Button onPress={() => screenProps.signOut()} title='Sign Out' />
      )
    }),
  },
  AddUserScreen: {
    screen: AddUserScreen,
    navigationOptions: ({screenProps}) => ({
      title: `Add Users`,
      headerRight: (
        <Button onPress={() => screenProps.signOut()} title='Sign Out' />
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
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginTop: 20,
  },
  input: {
    //flex: 1,
  },
  list: {
    //flex: 5,
  },
});
