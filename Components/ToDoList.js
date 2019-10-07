import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import Todo from './Todo';
import Input from './Input';

export default function TodoList(props) {
    console.log('props.todos', props.todos)

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={props.todos}
                extraData={props.todos}
                renderItem={({item}) => 
                    <Todo 
                        keyExtractor={item.id}
                        todo={item}
                        todoCollectionId={props.todoCollectionId} 
                        deleteTodo={props.deleteTodo}
                        changeTodoStatus={props.changeTodoStatus}>
                    </Todo>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    input: {
    },
    list: {
    }
  })