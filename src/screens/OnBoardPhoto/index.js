import { Center, Icon, useDisclose } from "native-base"
import React, { useEffect, useState } from "react"
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../assets/images"
import Helper from "../../common/Helper"
import Util from "../../common/util"
import { spacing } from "../../common/variables"
import Header from "../../components/Header"
import MyButton from "../../components/MyButton"
import PhotoPicker from "../../components/PhotoPicker"
import styles from "./styles"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { navigateAndReset } from "../../navigators/RootNavigation"
import LoaderComponent from "../../components/LoaderComponent"
import MyTextInput from "../../components/MyTextInput"
const OnBoardPhoto = (props) => {
    const { navigation, route } = props
    const [profilePic, setProfilePic] = useState(null)
    const [loading, setLoading] = useState(null)
    // const [address, setAddress] = useState("")
    // const [contact, setContact] = useState("")
    const {
        isOpen,
        onToggle,
        onClose,
        onOpen
    } = useDisclose();
    // useEffect(()=>{
    //     if(profilePic){
    //         handleNavigation()
    //     }
    // },[profilePic])
    const handleSubmit = () => {
        if(!profilePic){
            Util.showMessage("error","Please upload a profile pic.")
        }
        // else if(contact.length == 0){
        //     Util.showMessage("error","Please enter contact number.")
        // }
        // else if(address.length == 0){
        //     Util.showMessage("error","Please enter address.")
        // }
        else{
            handleNavigation()
        }
    }
    const handleNavigation = async() => {
        const uid = auth().currentUser.uid
        if (profilePic == null) {
            Util.showMessage("error", "Please select a profile pic", "")
        }
        else{
            // Util.showMessage("error", "Something went wrong!", "The server encountered an error and could not complete your request.")
            // return
            try {
                setLoading(true)
                const profileUrl = await Helper.uploadImage(`ProfilePic/${uid}`, profilePic)
                firestore()
                .collection("Users")
                .doc(uid)
                .update(
                    {
                        profilePic: profileUrl,
                        profileCompleted: true,
                        // contact,
                        // address
                    }
                )
                .then(() => {
                    setLoading(false)
                    navigateAndReset("HomeScreen")
                })
                
            } catch (error) {
                setLoading(false)
                //console.log(error)
            }
        }
    }
    const handleSkip = async() => {
        const uid = auth().currentUser.uid
        try {
            setLoading(true)
            firestore()
            .collection("Users")
            .doc(uid)
            .update(
                {
                    profileCompleted: true,
                }
            )
            .then(() => {
                setLoading(false)
                navigateAndReset("HomeScreen")
            })
            
        } catch (error) {
            setLoading(false)
            //console.log(error)
        }
    }
    return (
        <View style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Image
                    source={images.bgTopImage}
                    style={{width:"100%"}}
                    resizeMode='contain'
                />
            <View style={styles.mainView}>
                <Text style={styles.subText}>Let's complete your profile.</Text>
                <TouchableOpacity style={styles.topView} onPress={onToggle}>
                    <View style={styles.insideView}>
                        <View>
                                <FastImage
                                    source={profilePic?{ uri: profilePic.uri }:images.defaultUser}
                                    defaultSource={images.imagePlaceholder}
                                    resizeMode="cover"
                                    style={styles.image}
                                />
                        </View>
                    </View>
                    <Text style={styles.upload}>{`Upload Your\n   Profile Picture`}</Text>
                </TouchableOpacity>
                {/* <Center mt={5}>
                    <TouchableOpacity disabled>
                    </TouchableOpacity>
                    <Text style={styles.uploadSub}>Upload a photo under 2 MB</Text>
                </Center> */}
                 {/* <MyTextInput
                        containerStyle={{ marginVertical: spacing.small,marginTop:spacing.extraLarge }}
                        //iconName={"lock-outline"}
                        placeholder={"Address"}
                        value={address}
                        onChangeText={(txt) => setAddress(txt)}
                    />
                     <MyTextInput
                        containerStyle={{ marginVertical: spacing.small }}
                        //iconName={"lock-outline"}
                        placeholder={"Contact Number"}
                        value={contact}
                        onChangeText={(txt) => setContact(txt)}
                        keyboardType="number-pad"
                    /> */}
                <MyButton
                    title={"Done"}
                    txtStyle={{ color: "white" }}
                    //loading={loading}
                    containerStyle={{
                        marginTop:32,
                        // position: "absolute",
                        // bottom: spacing.large
                    }}
                    //loa
                    //icon={"chevron-right"}
                    onPress={handleSubmit}
                />
                {/* <MyButton
                    title={"Upload"}
                    txtStyle={{ color: "white" }}
                    //loading={loading}
                    containerStyle={{
                        marginTop:32,
                        width:"70%"
                        // position: "absolute",
                        // bottom: spacing.large
                    }}
                    //loa
                    //icon={"chevron-right"}
                    onPress={() => onToggle()}
                />
                <MyButton
                    title={"Skip"}
                    txtStyle={{ color: "white" }}
                    //loading={loading}
                    containerStyle={{
                        marginTop:32,
                        width:"70%",
                        backgroundColor:'black'
                        // position: "absolute",
                        // bottom: spacing.large
                    }}
                    //loa
                    //icon={"chevron-right"}
                    onPress={() => handleSkip()}
                /> */}
            </View>
            <LoaderComponent visible={loading} title="Just a moment..."/>
            <PhotoPicker isOpen={isOpen} onClose={onClose} setImage={setProfilePic} />
        </View>
    )
}
export default OnBoardPhoto