import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import { fontSizes, itemSizes } from '../../../common/variables'
import { Card, HStack, Icon, VStack } from 'native-base'
import FastImage from 'react-native-fast-image'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import colors from '../../../theme/colors'
import MyButton from '../../../components/MyButton'
import { useSelector } from 'react-redux'
import { distanceBetween } from 'geofire-common'
export default function SpaceCard({ data, navigation, hideBtn, isFav }) {
    const { latitude, longitude } = useSelector(state => state.user.currentPosition)
    const { lat, lng } = data.location
    const distance = distanceBetween([latitude, longitude], [lat, lng])
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {
                if (hideBtn)
                    navigation.goBack()
                else
                    navigation.navigate("AdDetail", { item: data })
            }}
        >
            <View style={styles.mainView}>
                <View style={styles.card}>
                    <HStack alignItems={"center"} height={100}>
                        <FastImage
                            source={{ uri: data.spaceImages[0] }}
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <VStack p={2} flex={0.6} h={100}>
                            <HStack justifyContent={"space-between"} alignItems={"center"}>
                                <Text style={styles.title}>
                                    {data.title}
                                </Text>
                            </HStack>
                            <Text style={styles.category}>
                                {data.category}
                            </Text>
                            <VStack mt={1}>
                                <HStack alignItems={"center"}>
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        size="sm"
                                        name='map-marker-radius'
                                        mr={1}

                                        //ml={2}
                                        color={colors.appPrimary}
                                    />
                                    <Text style={styles.subtitle}>{distance.toFixed(1)} km away</Text>
                                </HStack>
                                <HStack alignItems={"center"} mt={1}>
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        size="sm"
                                        name='image-outline'
                                        mr={1}

                                        //ml={2}
                                        color={colors.appPrimary}
                                    />
                                    <Text style={styles.subtitle} numberOfLines={1}>{`${data.height}f high  &  ${data.width}f wide`}</Text>
                                </HStack>
                            </VStack>
                            {/* <MyButton
                                onPress={() => {
                                    if(hideBtn)
                                        navigation.goBack()
                                    else
                                    navigation.navigate("AdDetail", { item:data })
                                }}
                                title="View Details"
                                containerStyle={{
                                    paddingHorizontal:10,
                                    paddingVertical:4,
                                    width:"auto",
                                    alignSelf:"flex-start"
                                }}
                                txtStyle={{
                                    fontSize:fontSizes.tiny
                                }}
                                rightIcon={
                                    "arrow-right-thin"
                                }
                                /> */}
                        </VStack>
                    </HStack>
                </View>
            </View>
        </TouchableOpacity>
    )
}