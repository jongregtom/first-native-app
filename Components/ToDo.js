import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function ToDo(props) {
    return (
        
        <View>
            <Text>{props.todo.key}</Text>
        </View>
    )
}