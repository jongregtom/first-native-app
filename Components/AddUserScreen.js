import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddUserScreen (props) {
    const [textValue, setTextValue] = useState('');
    const [userQuery, setUserQuery] = useState([]);
    let { params } = props.navigation.state;
    useEffect(() => {
        console.log('userQuery: ', userQuery)
        console.log(params)
    }, [userQuery])
    //const [userQuery, setUserQuery] = useState(params.userQuery);

    const getUsers = async function(text) {
        await params.db.collection('users').where('username', '==', text)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                setUserQuery(prevState => [...prevState, {id: doc.id,  data: doc.data()}])
                //result.push({id: doc.id, data: doc.data()})
              });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    
        await params.db.collection('users').where('email', '==', text)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                setUserQuery(prevState => [...prevState, {id: doc.id,  data: doc.data()}])
                //result.push({id: doc.id, data: doc.data()})
              });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
      }
    

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextValue(text)}
                    value={textValue}
                    placeholder={props.placeholder}
                />
                <TouchableOpacity
                        onPress = {() => {
                            if (textValue[textValue.length -1] == ' ') {
                                setTextValue(textValue.substring(0,-1))
                            }
                            getUsers(textValue);
                            setTextValue('');
                            //setUserQuery(users);
                            }
                        }
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Search Users</Text>
                        </View>
                    </TouchableOpacity>
            </View>
            {/* only render if userQuery results*/}
            {userQuery.length > 0 && 
                <View>
                    <Text>UserName: {userQuery[0].data.username}</Text>  
                    <Text>Email: {userQuery[0].data.email}</Text>
                    <Text>Is this who you're looking for?</Text>
                    <View style={styles.resultsView}>
                        <TouchableOpacity
                            onPress = {() => {
                                params.addUserToFriendList(userQuery[0]);
                            }}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {() => setUserQuery([])}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>No</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'flex-end',
        marginTop: 20,
        //borderBottomWidth: 1,
    }, 
    inputView: {
        flexDirection: 'row',
    },
    input: {
        borderBottomWidth: 1,
        flex: 10,
    },
    button: {
        marginBottom: 20,
        width: 150,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'  
    },
    resultsView: {
        flexDirection: 'row',
    }
})