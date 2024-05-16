import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { Center, HStack, Icon, VStack } from 'native-base';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontSizes } from '../../../common/variables';
import Header from '../../../components/Header';
import MyButton from '../../../components/MyButton';
import { membershipOfferings } from '../../../config/appConfig';
import { navigateAndReset } from '../../../navigators/RootNavigation';
import colors from '../../../theme/colors';
import styles from './styles';
const AdvertiserMembership = ({navigation, route}) => {
  const inset = useSafeAreaInsets();
  const hideBack = route?.params?.hideBack
  const [loading, setLoading] = useState(false);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const handleDone = async () => {
    setLoading(true);
    // firestore()
    // .collection('Users')
    // .doc(auth().currentUser.uid)
    // .update({
    //   membershipActive: true,
    //   profileCompleted: true,
    //   // subscriptionId,
    // })
    // .then(() => {
    //   navigateAndReset('HomeScreen');
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
    const userData = await firestore()
      .collection('Users')
      .doc(auth().currentUser.uid).get();
    const {customerId} = userData.data();
    const res2 = await functions().httpsCallable('createSubscription')({
      customerId: customerId,
    });
    const {subscriptionId, clientSecret,subscription} = res2.data;
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      returnURL: 'stripe-example://payment-sheet',
      // Set `allowsDelayedPaymentMethods` to true if your business handles
      // delayed notification payment methods like US bank accounts.
      allowsDelayedPaymentMethods: true,
    });
    presentSheet(subscriptionId);
    if (error) {
      // Handle error
      console.log('error', error);
    }
    setLoading(false);
  };
  const presentSheet = async (subscriptionId) => {
    setLoading(true);
    const {error} = await presentPaymentSheet();
    if (error) {
      if (error.code === PaymentSheetError.Failed) {
        console.log(error);
      } else if (error.code === PaymentSheetError.Canceled) {
        // Handle canceled
      }
    } else {
      firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .update({
          membershipActive: true,
          profileCompleted: true,
          subscriptionId,
        })
        .then(() => {
          navigateAndReset('HomeScreen');
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  };
  return (
    <ScrollView
      bounces={false}
      style={[styles.container]}
      contentContainerStyle={{paddingBottom: 10}}>
      <Header back={true} title={'Subscription'} normalBack navigation={navigation} />
      <View style={styles.card}>
        <Text style={styles.catText}> Monthly Subscription</Text>
        <HStack p={5}>
          <Text style={styles.subText}>$4.99</Text>
          <Text
            style={[
              styles.subText,
              {
                fontSize: fontSizes.small,
                color: colors.greyText,
                alignSelf: 'flex-end',
              },
            ]}>
            /Mo
          </Text>
        </HStack>
        <VStack alignItems={'flex-start'} space={1}>
          {membershipOfferings.map((item, index) => {
            return (
              <HStack alignItems={'center'} key={index}>
                <Center backgroundColor={'#D9D9D9'} p={0.5} borderRadius={10}>
                  <Icon
                    name="checkmark-outline"
                    as={Ionicons}
                    color={'black'}
                  />
                </Center>
                <Text style={styles.subSubText}>{item}</Text>
              </HStack>
            );
          })}
        </VStack>
        <MyButton
          title={'Subscribe'}
          containerStyle={{width: '90%', marginTop: 40}}
          onPress={handleDone}
          loading={loading}
        />
      </View>
      <Text style={styles.noteText}>
        • Advertisers who want to use the advertising platform are required to
        pay a fee. In this case, the fee is $4.99 AUD.
      </Text>
      <Text style={styles.noteText}>
        • The subscription is not a one-time payment; it recurs every month.
      </Text>
    </ScrollView>
  );
};
export default AdvertiserMembership;
