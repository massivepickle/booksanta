import * as React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native';
import db from '../config';
import * as firebase from 'firebase';
import SantaAnimation from '../components/santaAnimation';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            signUp: false,
            fullName: '',
            address: '',
            contactInfo: ''
        }
    }

    userSignup = async (email,password,confirmPassword) => {
        if(password !== confirmPassword){
            alert('Password does not match')
        }else{
            await firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
                alert('Successful account creation and login');
                this.setState({
                    signUp: false
                })
            }).catch(function(error){
                console.log(error.message);
            })
            db.collection('users').add({
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                address: this.state.address,
                contact: this.state.contactInfo
            })
        }
    }

    login = async () => {
        await firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
            alert('Successful login');
            this.props.navigation.navigate('AppDrawerNavigator');
        }).catch((error)=>{
            alert(error);
        });
    }

    render(){
        return(
            <View style = {{marginTop: 25}}>
                
                <Text>Enter e-mail address:</Text>
                <TextInput style = {styles.textInp}
                onChangeText = {(val)=>{this.setState({email: val})}}
                value={this.state.email}></TextInput>
                <Text>Enter password:</Text>
                <TextInput style = {styles.textInp}
                onChangeText = {(val)=>{this.setState({password: val})}}
                value = {this.state.password}
                secureTextEntry = {true}></TextInput>
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{this.login()}}>
                    <Text>Log-in</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{this.setState({signUp: true})}}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
                <Modal animationType = {'slide'}
                transparent = {false}
                visible = {this.state.signUp}>
                    <Text>Enter Full Name:</Text>
                    <TextInput style = {styles.textInp}
                    onChangeText = {(val)=>{this.setState({fullName: val})}}
                    value = {this.state.fullName}></TextInput>
                    <Text>Enter e-mail address:</Text>
                    <TextInput style = {styles.textInp}
                    onChangeText = {(val)=>{this.setState({email: val})}}
                    value = {this.state.email}></TextInput>
                    <Text>Enter password:</Text>
                    <TextInput style = {styles.textInp}
                    onChangeText = {(val)=>{this.setState({password: val})}}
                    value = {this.state.password}
                    secureTextEntry = {true}></TextInput>
                    <Text>Confirm password:</Text>
                    <TextInput style = {styles.textInp}
                    onChangeText = {(val)=>{this.setState({confirmPassword: val})}}
                    value = {this.state.confirmPassword}
                    secureTextEntry = {true}></TextInput>
                    <Text>Enter address:</Text>
                    <TextInput style = {styles.textInp}
                    onChangeText = {(val)=>{this.setState({address: val})}}
                    value = {this.state.address}></TextInput>
                    <Text>Enter Contact Info:</Text>
                    <TextInput style = {styles.textInp}
                    onChangeText = {(val)=>{this.setState({contactInfo: val})}}
                    value = {this.state.contactInfo}></TextInput>
                    <TouchableOpacity style = {styles.button}
                    onPress = {()=>{this.userSignup();}}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
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
