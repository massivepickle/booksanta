import * as React from 'react';
import {KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class RequestScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            bookName: '',
            reasonToRequest: ''
        }
    }

    createUniqueId = () => {
        return Math.random().toString(36).substring(7)+firebase.auth().currentUser.email;
    }

    addRequest = async () => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection('requested_books').add({
            user_id: userId,
            book_name: this.state.bookName,
            reason: this.state.reasonToRequest,
            request_id: randomRequestId
        });
        this.setState({
            bookName: '',
            reasonToRequest: ''
        });
    }

    render(){
        return(
            <KeyboardAvoidingView>
                <Text>Enter Book Name:</Text>
                <TextInput style = {styles.textInp}
                onChangeText = {(val)=>{this.setState({bookName: val});}}
                value = {this.state.bookName}></TextInput>
                <Text>Enter Reason to Request:</Text>
                <TextInput style = {styles.textInp}
                onChangeText = {(val)=>{this.setState({reasonToRequest: val});}}
                value = {this.state.reasonToRequest}></TextInput>
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{this.addRequest();}}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
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
        width: 50,
        height: 25,
        backgroundColor: 'lightblue'
    }
})