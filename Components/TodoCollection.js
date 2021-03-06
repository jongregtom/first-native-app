import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function TodoCollection(props) {
    return (
        
        <View style={styles.container}>
            <Button 
                title={props.todoCollection.data.name}
                onPress={() => props.navigation.navigate('TodoScreen', props)}
            />
            <Button
                onPress={() => props.deleteTodoCollection(props.todoCollection.id)}
                title='x'
                color='red'
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