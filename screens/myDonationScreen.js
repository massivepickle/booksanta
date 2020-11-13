import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class MyDonationScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            donorId: firebase.auth().currentUser.email,
            donorName: "",
            allDonation: []
        }
        this.requestRef = null;
    }

    sendNotification = async (bookDetails, requestStatus) => {
        var requestId = bookDetails.request_id;
        var donorId  = bookDetails.donor_id;
        db.collection("all_notifications")
        .where("request_id","==",requestId)
        .where("donor_id","==",donorId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = "";
                if(requestStatus === "book sent"){
                    message = this.state.donorName + " sent your book";
                }else{
                    message = this.state.donorName + " has shown interest in donating a book";
                }
                db.collection("all_notifications").doc(doc.id).update({
                    message: message,
                    notification_status: "unread",
                    date: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }

    componentDidMount = () => {
        await db.collection("all_notifications").where("donorId","==",this.state.donorId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    allDonation: [...doc.data,this.state.allDonation]
                })
            })
        })
    }

    /*sendBook = async (bookDetails) => {
        if(bookDetails.request_status === "book sent"){
            var requestStatus = "donor interested";
            await db.collection("all_notifications")
        }
    }*/

    render(){
        return(
            <View>
                <FlatList data={this.state.allDonation}
                renderItem={({item,i})=>{
                    return(
                        <ListItem key={i}
                        title={item.bookName}
                        subtitle={item.targetUserId+", "+item.date}
                        rightElement={{if()}}>

                        </ListItem>
                    )
                }}>
                    
                </FlatList>
            </View>
        )
    }
}