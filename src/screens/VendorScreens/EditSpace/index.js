import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Header from '../../../components/Header'
import FastImage from 'react-native-fast-image'
import { HStack, Icon, Select, useDisclose, VStack, ScrollView } from 'native-base'
import PhotoPicker from '../../../components/PhotoPicker'
import MyTextInput from '../../../components/MyTextInput'
import { spacing } from '../../../common/variables'
import colors from '../../../theme/colors'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { propertyCategories } from '../../../config/appConfig'
import MyButton from '../../../components/MyButton'
import LocationSelector from '../../../components/LocationSelector'
import Util from '../../../common/util'
import Helper from '../../../common/Helper'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import LoaderComponent from '../../../components/LoaderComponent'
import { geohashForLocation } from "geofire-common"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function EditSpace(props) {
    const { navigation, route } = props
    const {item} = route.params
    const {
        isOpen,
        onToggle,
        onClose,
        onOpen
    } = useDisclose();
    const [locationAllState, setLocationAllState] = useState({
        address: item.location.address,
        location: {latitude:item.location.lat,longitude:item.location.lng},
        visible: false
    })
    const toggleLocationPopup = () => {
        setLocationAllState({
            ...locationAllState,
            visible: true
        })
    }
    const [about, setAbout] = useState(item.about)
    const [title, setTitle] = useState(item.title)
    const [image, setImage] = useState(null)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [price, setPrice] = useState(item.price)
    const [width, setWidth] = useState(item.width)
    const [height, setHeight] = useState(item.height)
    const [mode, setMode] = useState(1)
    const [category, setCategory] = useState(item.category)
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const handleImage = (imageType) => {
        onToggle()
        setMode(imageType)
    }
    const selectImage = (img) => {
        switch (mode) {
            case 1: {
                setImage(img)
                break
            }
            case 2: {
                setImage1(img)
                break
            }
            case 3: {
                setImage2(img)
                break
            }
        }
    }
    const handleAddSpace = async () => {
        // if (!image) {
        //     Util.showMessage("error", "First image is compulsory")
        // }
        if (!title) {
            Util.showMessage("error", "Please provide a valid title")
        }
        else if (!about) {
            Util.showMessage("error", "Please provide a valid description")
        }
        else if(isNaN(price)|| Number(price)<=0){
            Util.showMessage("error", "Please provide a valid price")
        }
        else if (!height || height <= 0) {
            Util.showMessage("error", "Please provide a valid height")
        }
        else if (!width || width <= 0) {
            Util.showMessage("error", "Please provide a valid width")
        }
        else if (!locationAllState.address) {
            Util.showMessage("error", "Please add a valid location")
        }
        else {
            try {
                setLoaderVisibility(true)
                const uid = auth().currentUser.uid
                let spaceImages = item.spaceImages
                const hash = geohashForLocation([locationAllState.location.latitude, locationAllState.location.longitude])
                if(image){
                    const imageUrl = await Helper.uploadImage(`SpaceImage/${uid}/image`, image)
                    spaceImages[0] = imageUrl
                }
                if (image1) {
                    const image1Url = await Helper.uploadImage(`SpaceImage/${uid}/image1`, image1)
                    spaceImages[1] = image1Url
                }
                if (image2) {
                    const image2Url = await Helper.uploadImage(`SpaceImage/${uid}/image2`, image2)
                    spaceImages[2] = image2Url
                }
                const ref = firestore()
                    .collection("Space")
                    .doc(item.id)
                await ref.update({
                    spaceImages:spaceImages,
                    createTime: firebase.firestore.FieldValue.serverTimestamp(),
                    width,
                    height,
                    title,
                    vendorId: uid,
                    about,
                    category,
                    price:Number(price),
                    geohash: hash,
                    location: {
                        address: locationAllState.address,
                        lat: locationAllState?.location?.latitude ?? "",
                        lng: locationAllState?.location?.longitude ?? ""
                    },
                })
                navigation.goBack()
                Util.showMessage("success", "Success", "Space updated successfully")
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <KeyboardAwareScrollView style={styles.container} nestedScrollEnabled={false} bounces={false} keyboardShouldPersistTaps={"handled"}>
            <Header navigation={navigation} title="Edit Space" back />
            <View style={styles.mainView}>
                <TouchableOpacity style={styles.thumbnailView} onPress={() => handleImage(1)}>
                    {
                        image || item.spaceImages[0] ?
                            <FastImage
                                source={{ uri: image?image.uri:item.spaceImages[0] }}
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="cover"
                            /> :
                            <VStack alignItems={"center"}>
                                <Text style={styles.updateText} numberOfLines={1}>{image ? image.name : "Add Picture"}</Text>
                                <Text style={styles.subtitle}>{"JPEG or PNG, no larger than 10 MB."}</Text>
                            </VStack>
                    }
                </TouchableOpacity>
                <HStack space={2}>
                    <TouchableOpacity style={[styles.thumbnailView, { flex: 0.5 }]} onPress={() => handleImage(2)}>
                        {
                            image1 || item.spaceImages[1] ?
                                <FastImage
                                    source={{ uri: image1?image1.uri:item.spaceImages[1] }}
                                    style={{ width: "100%", height: "100%" }}
                                    resizeMode="cover"
                                /> :
                                <VStack alignItems={"center"}>
                                    <Text style={styles.updateText} numberOfLines={1}>{image1 ? image1.name : "Picture 2"}</Text>
                                    {/* <Text style={styles.subtitle}>{"JPEG or PNG, no larger than 10 MB."}</Text> */}
                                </VStack>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.thumbnailView, { flex: 0.5 }]} onPress={() => handleImage(3)}>
                        {
                            image2 || item.spaceImages[2] ?
                                <FastImage
                                    source={{ uri: image2?image2.uri:item.spaceImages[2] }}
                                    style={{ width: "100%", height: "100%" }}
                                    resizeMode="cover"
                                /> :
                                <VStack alignItems={"center"}>
                                    <Text style={styles.updateText} numberOfLines={1}>{image2 ? image2.name : "Picture 3"}</Text>
                                    {/* <Text style={styles.subtitle}>{"JPEG or PNG, no larger than 10 MB."}</Text> */}
                                </VStack>
                        }

                    </TouchableOpacity>
                </HStack>
                <Text style={styles.title}>Space Details</Text>
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    //iconName={"lock-outline"}
                    //isPass
                    placeholder={"Title"}
                    value={title}
                    onChangeText={(txt) => setTitle(txt)}
                //keyboardType={"number-pad"}
                />
                {/* <Text style={styles.title}>Brief Description</Text> */}
                <MyTextInput
                    numberOfLines={2}
                    containerStyle={{ marginVertical: spacing.small,}}
                    txtInputStyle={{height:100}}
                    multiline={true}
                    //iconName={"lock-outline"}
                    //isPass
                    placeholder={"Description"}
                    value={about}
                    onChangeText={(txt) => setAbout(txt)}
                //keyboardType={"number-pad"}
                />
                <MyTextInput
                    numberOfLines={2}
                    containerStyle={{ marginVertical: spacing.small,}}
                    //iconName={"lock-outline"}
                    //isPass
                    placeholder={"Price"}
                    value={price.toString()}
                    onChangeText={(txt) => setPrice(txt)}
                    keyboardType={"number-pad"}
                />
                <Text style={styles.title}>Size of Space</Text>
                <HStack w={"100%"} space={2}>
                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.small, flex: 1 }}
                        //iconName={"lock-outline"}
                        //isPass
                        placeholder={"Height (in feet)"}
                        value={height}
                        onChangeText={(txt) => setHeight(txt)}
                        keyboardType={"number-pad"}
                    />
                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.small, flex: 1 }}
                        //iconName={"lock-outline"}
                        //isPass
                        placeholder={"Width (in feet)"}
                        value={width}
                        onChangeText={(txt) => setWidth(txt)}
                        keyboardType={"number-pad"}
                    />
                </HStack>
                <Text style={styles.title}>Category</Text>
                <Select
                    _actionSheet={{ useRNModal: true }}
                    accessibilityLabel="Select Category"
                    placeholder="Category"
                    //px={spacing.medium}
                    py={Platform.OS == "ios" ? 4 : 2}
                    borderRadius={spacing.small}
                    borderWidth={1}
                    borderColor={colors.borderColor}
                    dropdownIcon={<Icon name="chevron-down" as={MaterialCommunityIcons} size="md" marginRight={3} />}
                    selectedValue={category}
                    color={"black"}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    {
                        propertyCategories.map((item) => {
                            return (
                                <Select.Item key={item.id} value={item.label} label={item.label} />
                            )
                        })
                    }
                </Select>
                <Text style={styles.title}>Location</Text>
                <TouchableOpacity style={styles.datePicker} onPress={() => toggleLocationPopup()}>
                    <Text
                        numberOfLines={2}
                        style={styles.txt}>{locationAllState.address ? locationAllState.address : "Select Location"}</Text>
                    <Icon
                        as={MaterialCommunityIcons}
                        name="map-marker-outline"
                        size={"md"}
                        width={"50%"}
                    />
                </TouchableOpacity>
                <MyButton
                    title={"Update Space"}
                    containerStyle={{
                        marginTop: 20
                    }}
                    onPress={handleAddSpace}
                />
            </View>
            <PhotoPicker
                isOpen={isOpen}
                onClose={onClose}
                isVideo={false}
                setImage={selectImage}
                isCover={true}
            />
            <LoaderComponent visible={loaderVisibility} title={"Updating details"} />
            <LocationSelector
                locationAllState={locationAllState}
                setLocationAllState={setLocationAllState}
            />
        </KeyboardAwareScrollView>
    )
}