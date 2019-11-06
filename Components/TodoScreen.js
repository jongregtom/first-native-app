import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TodoList from './TodoList';
import Input from './Input';

export default function TodoScreen(props) {
    let { params } = props.navigation.state;
    console.log('props:', Object.keys(props))
    console.log('params: ', Object.keys(params))
    console.log('id', params.todoCollection)
    const { db } = params;
    const [todoCollectionValue, setTodoCollectionValue] = useState(null);
    const [todosValue, setTodosValue] = useState([]);

    useEffect(() => {
      console.log('userQuery in todoScreen: ', params.userQuery)
    })

    useEffect(() => {
        const getTodoById = function(id, callback) {
          db.collection('todos').doc(id)
            .get().then(function(doc){
              callback({id: doc.id, data: doc.data()})
          })
        }
        db.collection('todoCollections').doc(params.todoCollection.id)
          .onSnapshot(function(querySnapshot) {
            setTodosValue([])
            const todoIds = querySnapshot.data().todos.reverse();
            todoIds.forEach(function(id) {
              getTodoById(id, (todo) => {setTodosValue(prevState => [...prevState, todo])})
              //getTodoById(id, (todo) => {todos.push[todo]})
            })
            //setTodosValue(todos)
          })
    }, [])

    useEffect(() => {
        setTodosValue([]);
    }, [params.todoCollection.data])

    // useEffect(() => {
    //   console.log('todosValue: ', todosValue)
    // }, [todosValue])

    return (
        <View style={styles.container}>
          <Input style={styles.input} userId={params.todoCollection.data.createdBy} addTodo={params.addTodo} placeholder={'Add New Item'} todoCollectionId={params.todoCollection.id}></Input>
          <TouchableOpacity
            onPress={() => {
              
              props.navigation.navigate('AddUserScreen', {
                user: params.user,
                todoCollection: params.todoCollection,
                searchUsers: params.searchUsers,
                db: params.db
              })
              }
            }
          > 
            <View style={styles.button}>
              <Text style={styles.buttonText}>Share List</Text>
            </View>
          </TouchableOpacity>
          <TodoList style={styles.list} todos={todosValue} deleteTodo={params.deleteTodo} todoCollectionId={params.todoCollection.id} changeTodoStatus={params.changeTodoStatus}></TodoList>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    input: {
      //flex: 1,
    },
    button: {
      marginBottom: 20,
      width: 150,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white'  
    },
    list: {
      //justifyContent: 'flex-start'
      //flex: 5,
    },
  });