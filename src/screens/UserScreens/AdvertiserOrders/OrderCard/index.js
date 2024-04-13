import { Box, HStack, Icon, VStack } from 'native-base'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MyButton from '../../../../components/MyButton'
import colors from '../../../../theme/colors'
import styles from './styles'
import auth from '@react-native-firebase/auth'
import { fontSizes } from '../../../../common/variables'
export default function OrderCard({ data, navigation, hideBtn }) {
    //const { latitude, longitude } = useSelector(state => state.user.currentPosition)
    //const { lat, lng } = data.location
    //const distance = distanceBetween([latitude, longitude], [lat, lng])
    const handleChat = () => {
        const lastMessage={
            senderUid:data.vendorId
        }
        navigation.navigate("PersonalChat",{lastMessage})
    }
    return (
        <Pressable style={styles.container} 
        onPress={() => {
            navigation.navigate("AdvertiserOrderDetails", { item:data })
        }}>
            <View style={styles.mainView}>
                <View style={styles.card}>
                    <HStack alignItems={"center"} height={100}>
                        <FastImage
                            source={{ uri: data?.spaceImages[0] }}
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <VStack p={2} flex={0.6} h={100}>
                            <HStack alignItems={"center"} justifyContent={"space-between"}>
                                <Text style={styles.title}>
                                    {data.title}
                                </Text>
                                <TouchableOpacity onPress={handleChat}>
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        size="lg"
                                        name='message-text'
                                        color={colors.appPrimary}
                                    />
                                </TouchableOpacity>
                            </HStack>
                            <HStack mt={2} alignItems={"center"}>
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="sm"
                                    name='cash'
                                    mr={1}
                                    //ml={1}
                                    color={colors.appPrimary}
                                />
                            <Text style={styles.subtitle}>{data.price} AUD</Text>
                            </HStack>
                           <HStack mt={1} alignItems={"center"}>
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="sm"
                                    name='map-marker-radius'
                                    mr={1}
                                    //ml={1}
                                    color={colors.appPrimary}
                                />
                            <Text style={styles.subtitle}>{data.category}</Text>
                           </HStack>
                            <HStack mt={1} alignItems={"center"}>
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="sm"
                                    name='image-outline'
                                    mr={1}
                                    //ml={1}
                                    color={colors.appPrimary}
                                />
                                <Text style={styles.subtitle}>{`${data.height}f high  &  ${data.width}f wide`}</Text>
                            </HStack>
                            {/* <HStack mt={2} ml={1} justifyContent={"space-between"} alignItems={"center"}>
                                <Box>
                                    <Text style={styles.subtitle}>{data.bookingTime.toDate().toDateString()}</Text>
                                    <Text style={[styles.subtitle,{marginTop:1}]}>${data.price}</Text>
                                </Box> 
                                 <MyButton
                                    onPress={() => {
                                        navigation.navigate("AdvertiserOrderDetails", { item:data })
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
                                />
                                
                            </HStack> */}
                        </VStack>
                    </HStack>
                    {/* <MyButton title={"Contact Seller"}/> */}
                </View>
            </View>
        </Pressable>
    )
}