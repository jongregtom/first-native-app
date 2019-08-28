import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function Input(props) {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => props.updateTextValue(text)}
                value={props.textValue}
                placeHolder='add new'
            />
            <Button
                style={styles.button}
                onPress={() => {
                    props.addTodo()
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
        borderWidth: 1,
        width: 200, 
        height: 30
    },
    button: {
    }
})