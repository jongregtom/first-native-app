import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import ToDo from './ToDo';
import Input from './Input';

export default function ToDoList(props) {
    return (
        <View style={styles.container}>
            <Text>CheckList</Text>
            <Input 
                textValue={props.textValue}
                updateTextValue={props.updateTextValue}
                addTodo={props.addTodo}
                style={styles.input}>
            </Input>
            <FlatList
                style={styles.list}
                data={props.todos}
                renderItem={({item}) => 
                    <ToDo 
                        todo={item} 
                        deleteTodo={props.deleteTodo}>
                    </ToDo>
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