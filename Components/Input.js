import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function Input(props) {

    const [textValue, setTextValue] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setTextValue(text)}
                value={textValue}
                placeholder={props.placeholder}
            />
            <Button
                style={styles.button}
                onPress={() => {
                    if (props.addToDB) {
                        props.addToDB(textValue)
                    } else if (props.addTodo){
                        props.addTodo(props.todoCollectionId, {text: textValue, completed: false, createdBy: '1234'})
                    }
                    setTextValue('');
                    }
                }
                title='+'
                color='blue' 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1
    }, 
    input: {
        //borderWidth: 1,
        width: 200, 
        height: 30
    },
    button: {
    }
})