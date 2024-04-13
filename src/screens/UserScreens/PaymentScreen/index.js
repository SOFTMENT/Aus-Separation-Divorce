import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Header from '../../../components/Header'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native'
import { HStack, Icon } from 'native-base'
import MyButton from '../../../components/MyButton'
import { spacing } from '../../../common/variables'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SpaceCard from '../SpaceCard'
import { PAYMENT_INTENT } from '../../../config/Networksettings'
import AppConstant from '../../../config/Constants'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Util from '../../../common/util'
import { firebase } from '@react-native-firebase/firestore'
import PopupMessage from '../../../components/PopupMessage'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
export default function PaymentScreen(props) {
    const { navigation, route } = props
    const { data } = route.params
    const [cardFilled, setCardFilled] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const { userData } = useSelector(state => state.user)
    const { confirmPayment, loading } = useConfirmPayment()
    //const uid = auth().currentUser.uid
    const payPressed = async () => {
        if(data.vendorId == auth().currentUser.uid){
            Util.showMessage("error","Oops!","You can't book your own space!")
            return
        }
        if (cardFilled) {
            setLoaderVisibility(true)
            var response
            try {
                var response = await axios({
                    method: AppConstant.POST,
                    url: PAYMENT_INTENT,
                    data: {
                        amount: data.price,
                        currency: "usd",
                        description: "booking payment"
                    },

                })
            } catch (error) {
                console.log(error)
                Util.showMessage("error", "Error", "Something went wrong")
            }
            const { clientSecret } = response.data
            //console.log(clientSecret)
            const { error, paymentIntent } = await confirmPayment(clientSecret, {
                paymentMethodType: "Card",
                billingDetails: {
                    name: userData.name,
                    email: userData.email
                }
            })
            if (error) {
                Util.showMessage("error", error.code, error.message)
                //showTopPopup(error.code,error.message,"danger")
            }
            else if (paymentIntent) {
                //  console.log(paymentIntent)
                await createBooking(paymentIntent.id)
                setTimeout(()=>{
                    setSuccessPopup(false)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Orders' }],
                    });
                },3000)
                setSuccessPopup(true)
                // showPopupAlert("")
                // navigation.navigate()
            }
            setLoaderVisibility(false)
        }
        else {
            Util.showMessage("error", "Error", "Please fill correct card details")
        }
    }
    const createBooking = async (paymentIntent) => {
        try {
            const bookingId = firestore().collection("Bookings").doc().id
            const obj = {
                paymentIntent,
                status: "Pending",
                advertiserId: auth().currentUser.uid,
                vendorId: data.vendorId,
                spaceId: data.id,
                amount: data.price,
                bookingTime: firebase.firestore.FieldValue.serverTimestamp(),
                bookingId,
                userName: userData.name,
            }
            await firestore().collection("Bookings").doc(bookingId).set(obj)
        } catch (error) {
            console.log(error)
            Util.showMessage("error", "Error", "Something went wrong")
        }
    }
    return (
        <View style={styles.container}>
            <Header title="Pricing" back navigation={navigation} />
            <SpaceCard data={data} hideBtn navigation={navigation} />
            <View style={styles.mainView}>
                <Text style={styles.title}>Card Details</Text>
                <CardField
                    postalCodeEnabled={true}
                    placeholder={{
                        number: '4242 4242 4242 4242',
                    }}
                    //cardStyle={styles.cardInner}
                    style={styles.cardView}
                    //autofocus={true}
                    onCardChange={(data) => { console.log(data); if (data.complete) setCardFilled(true) }}
                />
                <HStack
                    justifyContent={"space-between"}
                    padding={5}
                    borderRadius={5}
                    m={1} mt={5} bgColor={"#455A64"}
                >
                    <Text style={styles.amount}>SubTotal</Text>
                    <Text style={styles.amount}>$ {data.price}</Text>
                </HStack>
                <MyButton
                    title={"Pay"}
                    //txtStyle={{ color: "black" }}
                    loading={loaderVisibility}
                    //loading
                    containerStyle={{ marginTop: spacing.extraLarge, }}
                    icon={"lock"}
                    onPress={() => payPressed()}
                />
                <View style={styles.borderViewContainer}>
                    <View style={styles.borderView}></View>
                    <Text style={styles.or}>  OR  </Text>
                    <View style={styles.borderView}></View>
                </View>
                <MyButton
                    title={"Do You Need Service Provider"}
                    //txtStyle={{ color: "black" }}
                    //loading={loaderVisibility}
                    //loading
                    containerStyle={{ marginTop: spacing.extraLarge, }}
                    rightIcon={"chevron-right"}
                    onPress={() => navigation.navigate("ServiceProviderProfiles")}
                />
            </View>
            <PopupMessage visible={successPopup} onPress={() => {
                setSuccessPopup(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Orders' }],
                });
            }}
                title={"Booking Successful"}
                subtitle={"Great"}
            />
        </View>
    )
}