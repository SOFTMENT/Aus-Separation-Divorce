import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Header from '../../../components/Header'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FastImage from 'react-native-fast-image'
import images from '../../../assets/images'
import colors from '../../../theme/colors'
import { HStack, Icon } from 'native-base'
import CenteredLoader from '../../../components/CenteredLoader'
import NoResults from '../../../components/NoResults'
import firestore from '@react-native-firebase/firestore'
import auth from "@react-native-firebase/auth"
import Util from '../../../common/util'
export default function VendorSpaces({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSpaces()
          });
          return unsubscribe;
    }, [])
    const handleDelete = (id) => {
        try {
            firestore()
            .collection("Space")
            .doc(id)
            .delete()
            .then(()=>{
                Util.showMessage("error","Space deleted!")
                getSpaces()
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getSpaces = async () => {
        try {
            const uid = auth().currentUser.uid
            setLoading(true)
            await firestore()
                .collection("Space")
                .where("vendorId","==",uid)
                .orderBy("createTime","desc")
                .get()
                .then(snapshot => {
                    let localData = []
                    snapshot.docs.map(doc => {
                        localData.push(doc.data())
                    })
                    setData(localData)
                })
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const renderHighlight = ({ item }) => {
        return (
            <FastImage
                source={{ uri: item.spaceImages[0] }}
                style={styles.imageStyle}
                defaultSource={images.imagePlaceholder}
            >
                <TouchableOpacity style={styles.edit} onPress={()=>navigation.navigate("EditSpace",{item})}>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="sm"
                        name='pencil-outline'
                        //mr={1}
                        //ml={5}
                        color={colors.appPrimary}
                        //padding={1}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.delete} onPress={()=>handleDelete(item.id)}>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="sm"
                        name='trash-can-outline'
                        //mr={1}
                        //ml={5}
                        color={colors.appPrimary}
                        //padding={1}
                    />
                </TouchableOpacity>
                <View style={styles.detailsView}>
                    <Text style={styles.spaceTitle}>{item.title}</Text>
                    <HStack mt={2}>
                        {/* <Icon
                            as={MaterialCommunityIcons}
                            size="sm"
                            name='map-marker-outline'
                            mr={1}
                            color={colors.appPrimary}
                        />
                        <Text style={styles.subtitle}>2 km away</Text> */}
                        <Icon
                            as={MaterialCommunityIcons}
                            size="sm"
                            name='image-outline'
                            mr={1}
                            //ml={5}
                            color={colors.appPrimary}
                        />
                        <Text style={styles.subtitle}>{`${item.height}f high  &  ${item.width}f wide`}</Text>
                    </HStack>
                </View>
            </FastImage>
        )
    }
    const keyExtractor = (item) => item.id
    const onAdd = () => {
        navigation.navigate("AddSpace")
    }
    return (
        <View style={styles.container}>
            <Header
                title="My Spaces"
                navigation={navigation}
                onRightIconPress={onAdd}
                rightIcon={"plus-circle-outline"}
            />
            <View style={styles.mainView}>
                {
                    loading ?
                        <CenteredLoader />
                        : (
                            data.length > 0 ?
                                <FlatList
                                    //horizontal
                                    data={data}
                                    keyExtractor={keyExtractor}
                                    renderItem={renderHighlight}
                                    showsHorizontalScrollIndicator={false}
                                    bounces={false}
                                /> :
                                <NoResults />
                        )
                }
            </View>
        </View>
    )
}