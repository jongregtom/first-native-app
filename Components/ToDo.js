import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Todo(props) {
    return (
        
        <View style={styles.container}>
            <Button
                onPress={() => props.deleteTodo(props.todoCollectionId, props.todo)}
                title='x'
                color='red'
            />
            <Button 
                title={props.todo.text}
                onPress={() => alert(props.todo.text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
     //flex: 1,
     justifyContent: 'center',
     margin: 20,
     flexDirection: 'row'
    }
  });
  