import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import TodoCollection from './TodoCollection';
import Input from './Input';

export default function TodoCollectionList(props) {
    if (props.todoCollections.length > 0) {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={props.todoCollections}
                    extraData={props.todoCollections}
                    renderItem={({item}) => 
                        <TodoCollection
                            user={props.user}
                            todoCollection={item} 
                            deleteTodoCollection={props.deleteTodoCollection}
                            getTodos={props.getTodos}
                            db={props.db}
                            deleteTodo={props.deleteTodo}
                            getTodoCollectionById={props.getTodoCollectionById}
                            key={item.id}
                            navigation={props.navigation}
                            addTodo={props.addTodo}
                            changeTodoStatus={props.changeTodoStatus}
                            userQuery={props.userQuery}>
                        </TodoCollection>
                    }
                />
            </View>
        );
    } else {
        return <View style={styles.container}>
            <Text>
                Oops, looks like you don't have any lists yet.  Create one!
            </Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 10,
     //paddingTop: 22
    },
    list: {
    }
  })