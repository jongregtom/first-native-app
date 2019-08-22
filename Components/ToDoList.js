import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import ToDo from './/ToDo';

export default function ToDoList(props) {
    return (
        <View style={styles.container}>
            <Text>Hi</Text>
            <FlatList
                data={props.data}
                renderItem={({item}) => 
                    <ToDo todo={item}></ToDo>
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
  })