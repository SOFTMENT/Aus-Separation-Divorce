import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { Center, FlatList, Icon, Link, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import images from '../../../assets/images';
import { spacing } from '../../../common/variables';
import CenteredLoader from '../../../components/CenteredLoader';
import Header from '../../../components/Header';
import colors from '../../../theme/colors';
import styles from './styles';

let unsubscribe
const VendorAllListing = props => {
  const {navigation} = props;
  const [listings, setListings] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  const {name} = useSelector(state=>state.user.userData)
  useEffect(() => {
    getDataNearBy();
    return unsubscribe
  }, []);
  const getDataNearBy = async () => {
    setLoading(true);
    unsubscribe = firestore()
    .collection('Listing')
    .where('supplierId', '==', auth().currentUser.uid)
    .orderBy('createTime',"desc")
    .onSnapshot(querySnapshot => {
      console.log(querySnapshot)
        const newArray = querySnapshot.docs.map(doc => ({...doc.data()}))
        setListings(newArray);
        if (newArray.length == 0) setNoData(true);
        else setNoData(false);
        setLoading(false);
      },(error)=>{
        console.log(error)
      })
  };
  const renderCard = ({item}) => {
    return (
      <View style={{flex:0.5,margin:5}}>
          <FastImage
            defaultSource={images.imagePlaceholder}
            source={{uri: item.listingImages[0]}}
            style={styles.img}
            resizeMode="contain">
            <TouchableOpacity
              onPress={()=>navigation.navigate("EditListing",{item})}
              style={{
                position: 'absolute',
                zIndex: 1000,
                backgroundColor: colors.white,
                justifyContent: 'center',
                aligmItems: 'center',
                padding: 5,
                borderRadius: 100,
                top: 4,
                right: 4,
              }}>
              <Icon
                name="create"
                as={Ionicons}
                size="md"
                color={colors.appDefaultColor}
              />
            </TouchableOpacity>
          </FastImage>
        <VStack direction={"column"} mt={2}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.name}>{item?.location?.address}</Text>
        </VStack>
      </View>
    );
  };
  const keyExtractor = item => {
    return item.id;
  };
  return (
    <View style={styles.container}>
      <Header
        rightIcon={'add'}
        onRightIconPress={() => {
          navigation.navigate('AddListings');
        }}
        back
        navigation={navigation}
        title={'My Listings'}
      />
      {loading ? (
        <CenteredLoader />
      ) : noData ? (
        <Center flex={1} p={3}>
          <Text style={styles.noItem}>
            {`No product found`}
          </Text>
          <Link 
            onPress={()=>navigation.navigate('AddListings')}
            _text={{
            color:colors.appDefaultColor,
            textDecoration:"none",
            fontWeight:"medium"
          }}>
            Add Product
          </Link>
        </Center>
      ) : (
        <FlatList
          style={{paddingHorizontal: spacing.medium, flex: 1}}
          data={listings}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
export default VendorAllListing;
