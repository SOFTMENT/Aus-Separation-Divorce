import { Actionsheet, Box, HStack, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Util from '../../../common/util';
import { startCase } from 'lodash';
import colors from '../../../theme/colors';
import MyButton from '../../../components/MyButton';
import { spacing } from '../../../common/variables';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import { setUserData } from '../../../store/userSlice';
const SubscriptionModal = ({isOpen, onClose}) => {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  // const handleMembership = () => {
  //   memberShipCallback({
  //     selectedMembership:selectedTab == 0?'monthly':'yearly'
  //   })
  //   onClose()
  // }
  const {userData} = useSelector(state => state.user);
  const cancelSubscription = async() => {
    setLoading(true)
    const res = await functions().httpsCallable('cancelSubscription')({
      subscriptionId: userData?.subscriptionId,
      userId:userData.uid,  
    });
    console.log(res.data)
    const userSnapshot = await firestore().collection("Users").doc(userData?.uid)
    .get()
    dispatch(setUserData(userSnapshot.data()))
    setLoading(false)
  }
  const getColor = () => {
    switch(userData?.membershipStatus){
      case 'active':
        return 'green.500'
      case 'canceled':
        return 'red.500'
      default:
        return 'black'
    }
  }
  const formattedText = ()=>{
    return(
      <Text  fontWeight={'medium'} color={getColor()}>{startCase(userData?.membershipStatus)}</Text>
    )
  }
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text
            fontSize="16"
            fontWeight={'bold'}
            color="black"
            _dark={{
              color: 'black',
            }}>
            Membership Details
          </Text>
        </Box>
        <HStack w={"90%"} justifyContent={"space-between"} alignItems={"center"}>
          <VStack >
            <Text>Subscription</Text>
            <Text color={colors.appPrimary}>AUD 4.99 / Month</Text>
          </VStack>
          {formattedText()}
        </HStack>
        {
          userData?.membershipStatus == 'active' &&
          <MyButton
           loading={loading}
            title={"Unsubscribe"}
            onPress={()=>{
              cancelSubscription()
            }}
            containerStyle={{
                width:"90%",
                borderRadius:spacing.large
            }}
            txtStyle={{color:"white"}}
        />
        }
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export default SubscriptionModal;
