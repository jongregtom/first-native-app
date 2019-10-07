import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TodoList from './TodoList';
import Input from './Input';

export default function TodoScreen(props) {
    const params = props.navigation.state.params;
    const [todoCollectionValue, setTodoCollectionValue] = useState(null);
    const [todosValue, setTodosValue] = useState([]);
    const db = params.db;

    useEffect(() => {
        // params.getTodoCollectionById(params.todoCollection.id, (data) => {
        //     setTodoCollectionValue(data)
        // })
        console.log('todosValue: ', todosValue)
        const getTodoById = function(id, callback) {
          db.collection('todos').doc(id)
            .get().then(function(doc){
            callback({id: doc.id, data: doc.data()})
          })
        }
        db.collection('todoCollections').doc(params.todoCollection.id)
          .onSnapshot(function(querySnapshot) {
            querySnapshot.data().todos.forEach(function(id) {
              getTodoById(id, (todo) => {setTodosValue(prevState => [...prevState, todo])})
            })
          })
    }, [])

    useEffect(() => {
      console.log('todosValue: ', todosValue)
    }, [todosValue])

    return (
        <View style={styles.container}>
          <Input userId={params.todoCollection.data.createdBy} addTodo={params.addTodo} placeholder={'Add New Item'} todoCollectionId={params.todoCollection.id}></Input>
          <TodoList todos={todosValue} deleteTodo={params.deleteTodo} todoCollectionId={params.todoCollection.id} changeTodoStatus={params.changeTodoStatus}></TodoList>
          {/*<TodoList todos={todos} textValue={textValue} updateTextValue={updateTextValue} deleteTodo={deleteTodo} addTodo={addTodo} ></TodoList>*/}
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