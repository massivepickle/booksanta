import * as React from 'react';
import {KeyboardAvoidingView, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SettingScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            fullName: '',
            email: '',
            password: '',
            contact: '',
            address: '',
            docId: ''
        }
    }

    componentDidMount = async () => {
        var user = firebase.auth().currentUser;
        var email = user.email;
        await db.collection('users').where("email","==",email).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                    contact: data.contact,
                    address: data.address,
                    docId: doc.id
                })
            })
        })
    }

    updateChanges = async () => {
        var user = firebase.auth().currentUser;
        await db.collection('users').doc(this.state.docId).update({
            address: this.state.address,
            password: this.state.password,
            contact: this.state.contact,
            fullName: this.state.fullName
        }).then(()=>{
            alert('User Details Updated!');
        }).catch((error)=>{
            alert(error);
        })
    }

    render(){
        return(
            <KeyboardAvoidingView>
                <Text>Update User Info for {this.state.email}</Text>
                <Text>Change full name:</Text>
                <TextInput value = {this.state.fullName} 
                onChangeText = {(val) => {this.setState({fullName: val})}} 
                style = {styles.textInp} />
                <Text>Change password:</Text>
                <TextInput value = {this.state.password}
                onChangeText = {(val) => {this.setState({password: val})}}
                secureTextEntry = {true}
                style = {styles.textInp} />
                <Text>Change contact:</Text>
                <TextInput value = {this.state.contact}
                onChangeText = {(val) => {this.setState({contact: val})}}
                style = {styles.textInp} />
                <Text>Change address:</Text>
                <TextInput value = {this.state.address}
                onChangeText = {(val) => {this.setState({address: val})}}
                style = {styles.textInp} />
                <TouchableOpacity onPress = {()=>{this.updateChanges();}}
                style = {styles.button}>
                    <Text>CONFIRM</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    textInp: {
        borderWidth: 2,
        width: 100,
        height: 30
    },
    button: {
        borderRadius: 25,
        width: 100,
        height: 25,
        backgroundColor: 'lightblue'
    }
})