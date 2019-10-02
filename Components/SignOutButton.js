import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function SignOutButton(props) {
    return (
        <Button 
            onPress={() => props.Auth.signOut()}
            title='Sign Out'
            color='blue'
        />
    );
}