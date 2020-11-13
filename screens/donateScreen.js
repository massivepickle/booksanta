import * as React from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {ListItem} from 'react-native-elements';

export default class DonateScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            list: [],
            lastList: null
        }
    }

    componentDidMount = async () => {
        /*const DATA = await db.collection("requested_books").limit(10).get();
        DATA.docs.map((doc)=>{
            this.setState({
                list: [...this.state.list,doc.data()],
                lastList: doc
            });
        })*/
        this.getRequestAndBookList();
    }

    getRequestAndBookList = () => {
        db.collection("requested_books").onSnapshot((snapshot)=>{
            var requestedBookList = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                list: requestedBookList
            })
            console.log(requestedBookList)
        })
    }

    fetchMore = async () => {
        const data = await db.collection("requested_books").startAfter(this.state.lastList).limit(1).get();
        data.docs.map((doc)=>{
            this.setState({
                list: [...this.state.list,doc.data()],
                lastList: doc
            });
        })
    }

    render(){
        return(
            <View>
                <FlatList data = {this.state.list}
                renderItem = {({item, i})=>{
                    return(
                        <ListItem key = {i}
                        title = {item.book_name}
                        subtitle = {item.reason}
                        titleStyle = {{color: 'black', fontWeight: 'bold'}}
                        rightElement = {<TouchableOpacity style={{width: 200, height: 80, backgroundColor: 'lightblue'}}
                        onPress = {()=>{
                            this.props.navigation.navigate("ReceiverDetailsScreen",{details:item})
                        }}><Text>button</Text></TouchableOpacity>}
                        bottomDivider/>
                    )
                }}
                keyExtractor = {(item, index) => index.toString()}
                /*onEndReachedThreshold = {0.25}
                onEndReached = {()=>{this.fetchMore()}}*/></FlatList>
            </View>
        );
    }
}