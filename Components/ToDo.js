import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function ToDo(props) {
    return (
        
        <View style={styles.container}>
            <Button
                onPress={() => props.deleteTodo(props.todo.id)}
                title='x'
                color='red'
            />
            <Text>{props.todo.text}</Text>
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
  