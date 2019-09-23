import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function TodoCollection(props) {
    return (
        
        <View style={styles.container}>
            <Button
                onPress={() => props.deleteTodoCollection(props.todoCollection.id)}
                title='x'
                color='red'
            />
            <Button 
                title={props.todoCollection.data.name}
                onPress={() => props.navigation.navigate('TodoScreen', props)}
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