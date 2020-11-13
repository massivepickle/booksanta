import * as React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import firebase, { auth } from 'firebase';
import db from '../config';
import {Card, Header, Icon} from 'react-native-elements';

export default class ReceiverDetailsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            receiverId: this.props.navigation.getParam('details')['user_id'],
            requestId: this.props.navigation.getParam('details')['request_id'],
            bookName: this.props.navigation.getParam('details')['book_name'],
            reason_for_requesting: this.props.navigation.getParam('details')['reason_to_request'],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId: ''
        }
    }

    componentDidMount= () => {
        this.getReceiverDetails();
    }

    getReceiverDetails = async () => {
        db.collection('users').where("email","==",this.state.receiverId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    receiverName: doc.data().fullName,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address
                })
            })
        }).catch((err)=>{
            alert("error - "+err);
        });
    }

    addNotification = async () => {
        var message = this.state.userId + " has shown interest in donating a book";
        db.collection("all_notifications").add({
            target_user_id: this.state.receiverId,
            donor_id: this.state.userId,
            request_id: this.state.request_id,
            book_name: this.state.bookName,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            notification_status: "unread",
            message: message
        })
    }

    render(){
        return(
            <View>
                <Text>Requestor's Name: {this.state.receiverName}</Text>
                <Text>Requestor's Contact: {this.state.receiverContact}</Text>
                <Text>Requestor's Address: {this.state.receiverAddress}</Text>
                <TouchableOpacity style={{height: 30, width: 100, borderWidth: 2}}
                onPress={()=>{this.addNotification();
                this.props.navigation.navigate("DonateScreen")}}>
                    <Text>Donate Book</Text>
                </TouchableOpacity>
            </View>
        )
    }
}