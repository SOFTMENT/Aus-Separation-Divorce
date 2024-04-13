import auth from '@react-native-firebase/auth'
import { HStack, Icon, ScrollView } from 'native-base'
import React, { useEffect, useState } from "react"
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import Header from "../../components/Header"
import { navigateAndReset } from "../../navigators/RootNavigation"
import styles from "./styles"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MyButton from '../../components/MyButton'
import NoResults from '../../components/NoResults'
import { spacing } from '../../common/variables'
import firestore from '@react-native-firebase/firestore'
import Util from '../../common/util'
import axios from 'axios'
import { NOTIFY_CALL } from '../../config/Networksettings'
import AddCategory from './AddCategory'
import colors from '../../theme/colors'
let unsubscribe
const AdminScreen = (props) => {
    const {navigation} = props
    const [title,setTitle] = useState("")
    const [message,setMessage] = useState("")
    const [visible,setVisible] = useState(false)
    const [data,setData] = useState([])
    const [loader,setLoader] = useState(false)
    
    useEffect(()=>{
        getData()
        return unsubscribe
    },[])
    const getData = async() => {
        try {
            unsubscribe = firestore()
            .collection("Category")
            .onSnapshot(snap=>{
                const localData = []
                snap.docs.map(doc=>localData.push(doc.data()))
                setData(localData)
            })
            
        } catch (error) {
            
        }
    }
    const sendNotification = async() =>{
        return
        if(!title.trim()){
            Util.showMessage("error","Please Enter Title","")
            return
        }
        if(!message.trim()){
            Util.showMessage("error","Please Enter Message","")
            return
        }
        try {
            setTitle("")
            setMessage("")
            await axios({
                method:"post",
                url:NOTIFY_CALL,
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data:{
                    title:title,
                    message:message,
                    //topic:"all"
                }
            })
            Util.showMessage("success","Notification Sent","")
        } catch (error) {
            console.log(error)
        }   
    }
    const logout = async () => {
        try {
            auth()
                .signOut()
                .then(() => navigateAndReset("OnboardingScreen"));
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async id => {
        try {
            await firestore()
            .collection("Category")
            .doc(id)
            .delete()
            Util.showMessage("error","Category Deleted","")
        } catch (error) {
            
        }
    }
    const renderData = ({item}) => {
        return(
            <HStack borderColor={"black"} borderWidth={1} p={3} borderRadius={6} alignItems={"center"} mb={3}>
                <Text>
                    {item.categoryName}
                </Text>
                <TouchableOpacity style={styles.logContainer} onPress={()=>handleDelete(item.id)}>
                    <Icon
                        name="delete-empty"
                        size={"xl"}
                        as={MaterialCommunityIcons}
                        color={colors.appDefaultColor}
                    />
                </TouchableOpacity>
            </HStack>
        )
    }
    const keyExtractor = (item) => item.id
    return (
        <ScrollView style={styles.container}>
            <Header title="SiteSii"/>
            <View style={styles.titleView}>
                <Text style={styles.logoutText}>{`Hello, \nAdmin`}</Text>
                <TouchableOpacity style={styles.logContainer} onPress={logout}>
                    <Icon
                        name="logout"
                        size={"lg"}
                        as={MaterialCommunityIcons}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            {/* <Text style={styles.heading}>Send Notification</Text>
            <TextInput
                value={title}
                onChangeText={(txt)=>setTitle(txt)}
                placeholder="Title"
                style={styles.title}
                placeholderTextColor="white"
            />
            <TextInput
                value={message}
                onChangeText={(txt)=>setMessage(txt)}
                placeholder="Message"
                style={styles.message}
                multiline
                numberOfLines={3}
                placeholderTextColor="white"
            />
            <MyButton
                title="Send Notification"
                containerStyle={{marginVertical:10}}
                txtStyle={{color:"white"}}
                onPress={sendNotification}
            /> */}
            <HStack>
            <Text style={styles.heading}>Manage Categories</Text>
             <TouchableOpacity style={styles.logContainer} onPress={()=>setVisible(true)}>
                    <Icon
                        name="plus"
                        size={"xl"}
                        as={MaterialCommunityIcons}
                        color={colors.appDefaultColor}
                    />
                </TouchableOpacity>
            </HStack>
            <FlatList
                data={data}
                renderItem={renderData}
                keyExtractor={keyExtractor}
                style={{marginTop:10,flex:1}}
            />
            <AddCategory visible={visible} setMenuOpen={setVisible}/>
        </ScrollView>
    )
}
export default AdminScreen