import { FlatList, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { Avatar, Center } from "native-base";
import Header from "../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AvatarIcon from "../../components/AvatarIcon";
import NoResults from "../../components/NoResults";
import colors from "../../theme/colors";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const Inbox = (props) => {
    const {navigation} = props
    const timeAgo = new TimeAgo("en-US")
    const [lastChats, setLastChats] = useState([])
    const uid = auth().currentUser.uid
    const insets = useSafeAreaInsets()
    useEffect(() => {
        // const q = query(collection(db, "Chats",uid,"LastMessage"), orderBy("date","desc"));
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // const lastChats = [];
        // querySnapshot.forEach((doc) => {
        //     lastChats.push({...doc.data(),id:doc.id});
        // });
        // dispatch({
        //     type:SET_LAST_MESSAGES,
        //     data:lastChats
        // })
        // });
        // return unsubscribe
        firestore()
            .collection("Chats")
            .doc(uid)
            .collection("LastMessage")
            .orderBy("date", "desc")
            .onSnapshot( querySnapshot => {
                const temp = []
                querySnapshot.forEach((doc) => {
                    temp.push({ ...doc.data(), id: doc.id,
                    });
                });
                combineRecipentData(temp)
                //console.log(temp,querySnapshot.size)
            })
            
    }, [])
    const combineRecipentData = async (tempData) => {
        const newTempData = []
        for( let data of tempData){
            const res = await firestore().collection("Users").doc(data.senderUid).get()
            const senderData = res.data()
            newTempData.push({
                ...data,
                senderImage:senderData.profilePic,senderName:senderData.name
            })
        }
        setLastChats(newTempData)
    }
    const renderChats = ({ item }) => {
       const lastMessage = item
        return (
            <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("PersonalChat",{lastMessage})}>
                <View style={styles.rightBox}>
                    <View style={styles.profile}>
                        <AvatarIcon
                            uri={item.senderImage}
                            style={{
                                borderWidth:1,
                                borderColor:colors.white
                            }}
                        />
                    </View>
                    <View style={styles.chatBox}>
                        <Text style={styles.title}>{item.senderName}</Text>
                        <Text style={styles.text} numberOfLines={1}>{item.message}</Text>
                    </View>
                </View>
                <Text style={styles.smallTxt}>{item.date?.toDate()?timeAgo.format(item.date?.toDate()):""}</Text>
            </TouchableOpacity>
        )
    }
    const keyExtractor = (item) => {
        return item.id
    }
    return (
        <View style={[styles.container]}>
            <Header title="Messages"/>
            {
                lastChats.length > 0 ?
                    <FlatList
                        renderItem={renderChats}
                        data={lastChats}
                        keyExtractor={keyExtractor}
                    />
                    :
                    <NoResults title={"No Chats"}/>
            }
        </View>
    )
}
export default Inbox