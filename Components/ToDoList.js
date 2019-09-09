import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import Todo from './Todo';
import Input from './Input';

export default function TodoList(props) {
    return (
        <View style={styles.container}>
            <Input 
                textValue={props.textValue}
                updateTextValue={props.updateTextValue}
                addTodo={props.addTodo}
                style={styles.input}>
            </Input>
            <FlatList
                style={styles.list}
                data={props.todos}
                extraData={props.todos}
                keyExtractor={props.todos.id}
                renderItem={({item}) => 
                    <Todo 
                        todoGroup={item} 
                        deleteTodo={props.deleteTodo}>
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