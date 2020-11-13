import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import WelcomeScreen from '../screens/welcomeScreen';
import firebase from 'firebase';

export default class CustomSidebarMenu extends React.Component {
    render(){
        return(
            <View>
                <DrawerItems {...this.props}></DrawerItems>
                <TouchableOpacity style = {{backgroundColor: 'lime', width: 100, height: 30, borderWidth: 2}}
                onPress = {()=>{
                    firebase.auth().signOut().then(()=>{
                        alert('Logged out');
                        this.props.navigation.navigate('WelcomeScreen');
                    }).catch((error)=>{
                        alert(error.message)
                    });
                }}>
                    <Text>Log-out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}