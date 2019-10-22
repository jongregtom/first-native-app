import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TodoList from './TodoList';
import Input from './Input';

export default function TodoScreen(props) {
    const { params } = props.navigation.state;
    const { db } = params;
    const [todoCollectionValue, setTodoCollectionValue] = useState(null);
    const [todosValue, setTodosValue] = useState([]);

    useEffect(() => {
        console.log('props ', props)
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
            onPress={() =>
              alert('Hi')
              // {props.navigation.navigate('addUserScreen', props)}
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