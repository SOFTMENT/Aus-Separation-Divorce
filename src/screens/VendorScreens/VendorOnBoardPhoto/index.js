import { Center, Icon, useDisclose } from "native-base"
import React, { useState } from "react"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import Helper from "../../../common/Helper"
import Util from "../../../common/util"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import PhotoPicker from "../../../components/PhotoPicker"
import styles from "./styles"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { navigateAndReset } from "../../../navigators/RootNavigation"
const VendorOnBoardPhoto = (props) => {
    const { navigation, route } = props
    const [profilePic, setProfilePic] = useState(null)
    const [loading, setLoading] = useState(null)
    const {
        isOpen,
        onToggle,
        onClose,
        onOpen
    } = useDisclose();
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
                    }
                )
                .then(() => {
                    navigateAndReset("HomeScreen")
                })
                .finally(()=>{
                    setLoading(false)
                })
            } catch (error) {
                
            }
        }
    }
    return (
        <View style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} title="Let's complete your profile" />
            {/* <Text style={styles.subText}>Personal Information</Text> */}
            <View style={styles.mainView}>
                <View style={styles.topView}>
                    <View style={styles.insideView}>
                        <TouchableOpacity onPress={onToggle}>
                                <FastImage
                                    source={profilePic?{ uri: profilePic.uri }:images.defaultUser}
                                    defaultSource={images.imagePlaceholder}
                                    resizeMode="cover"
                                    style={styles.image}
                                />
                        </TouchableOpacity>
                    </View>
                </View>
                <Center mt={5}>
                    <TouchableOpacity onPress={onToggle}>
                        <Text style={styles.upload}>UPLOAD YOUR PICTURE</Text>
                    </TouchableOpacity>
                    <Text style={styles.uploadSub}>Upload a photo under 2 MB</Text>
                </Center>
                <MyButton
                    title={"Upload"}
                    //txtStyle={{ color: "black" }}
                    loading={loading}
                    containerStyle={{
                        marginTop:32,
                        width:"70%"
                    }}
                    loa
                    //icon={"chevron-right"}
                    onPress={() => handleNavigation()}
                />
            </View>
            <PhotoPicker isOpen={isOpen} onClose={onClose} setImage={setProfilePic} />
        </View>
    )
}
export default VendorOnBoardPhoto