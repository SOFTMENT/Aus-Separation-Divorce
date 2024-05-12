import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import FastImage from 'react-native-fast-image'
import { Card, HStack, Icon, VStack } from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import colors from '../../../../theme/colors'
import {distanceBetween} from 'geofire-common'
import { useSelector } from 'react-redux'
import LocationIcon from '../../../../assets/svgs/location.svg'
import AddressIcon from '../../../../assets/svgs/address.svg'
export default function NearbyHome(props) {
    const { item, navigation } = props
    const {latitude,longitude} = useSelector(state=>state.user.currentPosition) || {}
    const {lat,lng} = item.location
    let distance = null
    if (latitude !== undefined && longitude !== undefined) {
        // Latitude and longitude are not null or undefined
        // Proceed with your logic here
        distance = distanceBetween([latitude, longitude], [lat, lng]);
        // Use the distance variable as needed
    } else {
        // Latitude and/or longitude are null or undefined
        // Handle the case accordingly
    }
    return (
       <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate("ListingDetail", { item })}>
            <FastImage
                source={{ uri: item.advertiserImages[0]}}
                style={styles.image}
            />
            <VStack style={{width:"55%",paddingLeft:10}}>
                <Text style={styles.spaceTitle}>
                    {item.title}
                </Text>
                <HStack mt={2}>
                    {/* <Icon
                        as={MaterialCommunityIcons}
                        size="sm"
                        name='map-marker-outline'
                        mr={1}
                        color={colors.appPrimary}
                    /> */}
                     <AddressIcon width={20} height={20}/>
                    <Text style={styles.subtitle}>{item?.location?.address}</Text>
                </HStack>
                {
                    distance &&
                    <HStack mt={2} alignItems={"center"} >
                <LocationIcon width={15} height={15}/>
                    <Text style={[styles.subtitle,{marginLeft:10}]}>{distance?.toFixed(1)} km away</Text>
                </HStack>
                }
            </VStack>
       </TouchableOpacity>
    )
}