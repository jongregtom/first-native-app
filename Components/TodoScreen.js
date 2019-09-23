import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TodoList from './TodoList';
import Input from './Input';

export default function TodoScreen(props) {
    const params = props.navigation.state.params;
    const [todoCollectionValue, setTodoCollectionValue] = useState(null);
    const [todosValue, setTodosValue] = useState([]);

    useEffect(() => {
        params.getTodoCollectionById(params.todoCollection.id, (data) => {
            setTodoCollectionValue(data)
        })
    }, [])

    useEffect(() => {
        if (todoCollectionValue != null) {
            setTodosValue(todoCollectionValue.todos.reverse())
        }
    }, [todoCollectionValue])

    return (
        <View style={styles.container}>
          <Input addTodo={params.addTodo} placeholder={'Add New Item'} todoCollectionId={params.todoCollection.id}></Input>
          <TodoList todos={todosValue} deleteTodo={params.deleteTodo} todoCollectionId={params.todoCollection.id}></TodoList>
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