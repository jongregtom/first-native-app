import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import TodoCollection from './TodoCollection';
import Input from './Input';

export default function TodoCollectionList(props) {
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={props.todoCollections}
                extraData={props.todoCollections}
                renderItem={({item}) => 
                    <TodoCollection
                        todoCollection={item} 
                        deleteTodoCollection={props.deleteTodoCollection}
                        keyExtractor={item.id}>
                    </TodoCollection>
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