import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import LoaderComponent from '../../../components/LoaderComponent'
import PopupMessage from '../../../components/PopupMessage'
import Util from '../../../common/util'
import { setUserData } from '../../../store/userSlice'
import axios from 'axios'
import AppConstant from '../../../config/Constants'
import { PAYMENT_TRANSFER } from '../../../config/Networksettings'
import Header from '../../../components/Header'
import { Box, Card, getColor, HStack, Icon } from 'native-base'
import colors from '../../../theme/colors'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from '../../../assets/images'
import { format } from 'date-fns'

export default function AccountDetailsScreen(props) {
    const { navigation } = props
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const { accountStatus, accountId, balance, uid } = useSelector(state => state.user.userData)
    const [transactions,setTransactions] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        getTransactions()
    },[])
    const getTransactions = async() => {
        try {
            await firestore()
            .collection("Users")
            .doc(uid)
            .collection("Transaction")
            .orderBy("transactionTime","desc")
            .get()
            .then(snapshot=>{
                const localData = []
                snapshot.forEach(doc=>{
                    localData.push(doc.data())
                })
                console.log(transactions)
                setTransactions(localData)
            })
        } catch (error) {
            
        }
    }
    const handleSuccess = () => {
        setSuccessPopup(false)
    }
    const getUserData = () => {
        firestore()
            .collection("Users")
            .doc(uid)
            .get()
            .then(userData => {
                if (userData.exists)
                    dispatch(setUserData(userData.data()))
            })
    }
    const handleWithdraw = async () => {
        const latestData = await firestore().collection("Users").doc(uid).get()
        const latestBalance = latestData.data().balance
        if (isNaN(latestBalance) || latestBalance <= 0) {
            Util.showMessage("error", "Insufficient balance")
        }
        else {
            setLoaderVisibility(true)
            try {
                var body = new FormData()
                body.append('account_id', accountId)
                body.append('amount', Math.round(latestBalance * 100))
                var response = await axios({
                    method: AppConstant.POST,
                    url: PAYMENT_TRANSFER,
                    data: body
                })
                if (response.status === 400)
                    Util.showMessage("error", "Something went wrong",)
                else if (response.data.error == true) {
                    Util.showMessage("error", "Something went wrong, try again later.")
                }
                else {
                    const batch = firestore().batch()
                    const pHistoryRef = firestore().collection("PaymentHistory").doc()
                    batch.set(pHistoryRef, {
                        withdrawDetails: response.data,
                        uid,
                        createTime: firebase.firestore.FieldValue.serverTimestamp(),
                        balance,
                        accountId
                    })
                    const userRef = firestore().collection("Users").doc(uid)
                    batch.update(userRef, {
                        balance: 0
                    })
                    const transRef =  firestore().collection("Users").doc(uid)
                    .collection("Transaction").doc()
                    batch.set(
                        transRef,
                        {
                            bookingId:transRef.id,
                            status:"Debit",
                            transactionTime:firebase.firestore.FieldValue.serverTimestamp(),
                            amount:latestBalance
                        }
                    )
                    await batch.commit()
                    getUserData()
                    setSuccessPopup(true)
                }
                setLoaderVisibility(false)
            } catch (error) {
                console.log(error)
                Util.showMessage("error", "Something went wrong", "danger")
            }
            finally {
                setLoaderVisibility(false)
            }
        }
    }
    const getColor = (status) => {
        if(status == "Pending")
            return "orange.100"
        else if(status=="Debit"){
            return "red.200"
        }
        else if(status == "Credit")
            return "green.100"
    }
    const renderTransaction = ({item}) => {
        console.log(item)
        return(
            <HStack 
                justifyContent={"space-evenly"} 
                alignItems={"center"}
                bgColor={getColor(item.status)}
                my={1}
                py={2}
                borderRadius={4}
            >
                <Text style={styles.value}>
                    {`${format(item.transactionTime.toDate(),"PP")}\n${format(item.transactionTime.toDate(),"p")}`}
                </Text>
                <Text style={styles.value}>{item.amount}</Text>
                <Text style={styles.value}>{item.status}</Text>
            </HStack>
        )
    }
    const RenderHeader = () => {
       return(
        <HStack justifyContent={"space-evenly"} 
            mb={2}
            space={1} bgColor={colors.appPrimary} borderRadius={4} p={2}>
            <Text style={styles.heading}>Date</Text>
            <Text style={styles.heading}>Amount</Text>
            <Text style={styles.heading}>Status</Text>
        </HStack>
       )
    }
    return (
        <View style={styles.container}>
            <Header title={"Account Details"} back navigation={navigation} />
            <View style={styles.mainView}>
                <Box borderRadius={10} bgColor={colors.appPrimary} p={5}>
                    <HStack space={2}>
                        <Box bgColor={"white"} p={3} borderRadius={100}>
                            <Icon
                                as={MaterialCommunityIcons}
                                size="xl"
                                name='wallet'
                                color={colors.appPrimary}
                            />
                        </Box>
                        <HStack alignItems={"center"} justifyContent={"space-between"} flex={1}>
                            <Text style={styles.balance}>AUD {balance}</Text>
                            <TouchableOpacity onPress={handleWithdraw}>
                                <Image source={images.withdrawal} style={{width:20,height:20,tintColor:"white"}}/>
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                </Box>
                <Text style={styles.transaction}>Transactions</Text>
                <FlatList
                    renderItem={renderTransaction}
                    keyExtractor={item=>item.bookingId}
                    data={transactions}
                    bounces={false}
                    style={{flex:1}}
                    ListHeaderComponent={<RenderHeader/>}
                />
            </View>
            <LoaderComponent visible={loaderVisibility} />
            <PopupMessage 
                visible={successPopup} 
                title="Payment Successful" 
                subtitle="Great" 
                onPress={handleSuccess} 
            />
        </View>
    )
}