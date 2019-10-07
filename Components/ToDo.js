import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Switch, Text, Button } from 'react-native';

export default function Todo(props) {
    const { completed } = props.todo.data;
    //completed = false || true
    const [lineThroughValue, setLineThroughValue] = useState((completed == false) ? 'none' : 'line-through')
    const [completedValue, setCompletedValue] = useState(completed)

    useEffect(() => {
        setLineThroughValue((completedValue == false) ? 'none' : 'line-through')
        props.changeTodoStatus(props.todo.id, completedValue)
    }, [completedValue])

    function toggleSwitch(value) {
        setCompletedValue(value)
    }
    return (
        
        <View style={styles.container}>
            <Switch
                onValueChange={toggleSwitch}
                value={completedValue}/>
            <Text style={[styles.text, {textDecorationLine: lineThroughValue}]}>
                {props.todo.data.text}
            </Text>
            <Button
                onPress={() => props.deleteTodo(props.todoCollectionId, props.todo.id)}
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
    },
    text: {
    }
  });
  