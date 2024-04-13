import { HStack, Icon, ScrollView } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Carousel from 'react-native-reanimated-carousel'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Util from '../../../common/util'
import { spacing } from '../../../common/variables'
import Header from '../../../components/Header'
import colors from '../../../theme/colors'
import styles from './styles'
export default function AdvertiserOrderDetails(props) {
    const { route , navigation} = props
    const { item } = route.params
    // const {latitude,longitude} = useSelector(state=>state.user.currentPosition)
    const {lat,lng} = item.location
    // const distance = distanceBetween([latitude,longitude],[lat,lng])
    const renderCarousel = ({ item }) => {
        return (
            <FastImage
                source={{ uri: item }}
                style={styles.image}
            />
        )
    }
    return (
        <ScrollView style={styles.container} bounces={false}>
            <Header
                title={item.title}
                back
                // rightIcon={"heart-outline"}
                // onRightIconPress={handleFav}
                navigation={navigation}
            />
            <Carousel
                style={{marginTop:-20}}
                width={Util.getWidth(100)}
                height={Util.getHeight(25)}
                //autoPlay={true}
                data={item.spaceImages}
                renderItem={renderCarousel}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
            />
            <View style={{padding:spacing.large,paddingTop:0,flex:1}}>
                <HStack mt={2} ml={-2} alignItems={"center"} >
                    <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name='map-marker-outline'
                        mr={1}
                        color={colors.appPrimary}
                    />
                    <Text style={styles.subtitle}>{item.category}</Text>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name='image-outline'
                        mr={1}
                        ml={5}
                        color={colors.appPrimary}
                    />
                    <Text style={styles.subtitle}>{`${item.height}f high  &  ${item.width}f wide`}</Text>
                </HStack>
                {/* <Text style={styles.des}>Order By</Text>
                <Text style={styles.about}>{item.userName}</Text> */}
                <Text style={styles.des}>Order No.</Text>
                <Text style={styles.about}>{item.bookingId}</Text>
                <Text style={styles.des}>Order Time</Text>
                <Text style={styles.about}>{item.bookingTime?.toDate()?.toDateString() ?? ""}</Text>
                <Text style={styles.des}>Amount</Text>
                <Text style={styles.about}>$ {item.amount}</Text>
                <Text style={styles.des}>Status</Text>
                <Text style={styles.about}>{item.status}</Text>
                {/* <MyButton
                    title={"Book Now"}
                    containerStyle={styles.btn}
                    onPress={()=>navigation.navigate("PaymentScreen",{data:item})}
                /> */}
            </View>
            
        </ScrollView>
    )
}