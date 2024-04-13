import { Actionsheet, HStack, Icon, IconButton, Stagger } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Helper from '../../common/Helper';
import colors from '../../theme/colors';
export default function PhotoPicker(props) {
    const {
        isOpen,
        onToggle,
        onClose,
        setImage,
        isVideo,
        isCover,
        isTF
    } = props;
    const handleCamera = () => {
        onClose()
        if(isVideo){
            Helper.openCameraVideo()
            .then(val=>{
                setImage(val)
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else{
            Helper.openCamera(isCover)
            .then(val=>{
                setImage(val)
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
    const handleImage = () => {
        onClose()
        if(isVideo){
            Helper.pickVideo()
            .then(val=>{
                setImage(val)
            })
        }
        else if(isTF){
            Helper.pickImageTF(isCover)
            .then(val=>{
                setImage(val)
            })
        }
        else{
            Helper.pickImage(isCover)
            .then(val=>{
                setImage(val)
            })
        }
    }
    const handleCameraMultiple = () => {
        Helper.pickImageMultiple(isCover)
            .then(val=>{
                setImage(val)
            })
    }
    const handleImageMultiple = () => {
        Helper.pickImageMultiple(isCover)
        .then(val=>{
            setImage(val)
        })
    }
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose} >
            <Actionsheet.Content bg={"white"}>
                <HStack justifyContent={"flex-start"} w="100%">
                    <Stagger 
                        visible={isOpen} initial={{
                        opacity: 0,
                        scale: 0,
                        translateY: 34
                    }} animate={{
                        translateY: 0,
                        scale: 1,
                        opacity: 1,
                        transition: {
                            type: "spring",
                            mass: 0.8,
                            stagger: {
                                offset: 30,
                                reverse: true
                            }
                        }
                    }} exit={{
                        translateY: 34,
                        scale: 0.5,
                        opacity: 0,
                        transition: {
                            duration: 10,
                            stagger: {
                                offset: 30,
                                reverse: true
                            }
                        }
                    }}>
                        <IconButton 
                            onPress={handleCamera}
                            mx="2" 
                            variant="solid" 
                            bg={colors.appPrimary} 
                            colorScheme="gray" 
                            borderRadius="full" 
                            icon={<Icon as={MaterialCommunityIcons} 
                            size="6" 
                            name="camera" 
                            _dark={{
                                color:"white"
                        }}  color={"white"} />} />
                        <IconButton 
                            onPress={handleImage}
                            mx="2" 
                            variant="solid" 
                            bg={colors.appPrimary} 
                            colorScheme="gray" 
                            borderRadius="full" 
                            icon={<Icon as={MaterialCommunityIcons} 
                            size="6" 
                            name="image" 
                            _dark={{
                                color:"white"
                        }}  color={"white"} />} />
                    </Stagger>
                </HStack>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
