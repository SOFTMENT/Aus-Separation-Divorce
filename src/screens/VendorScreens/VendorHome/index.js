import firestore from '@react-native-firebase/firestore';
import { Icon, Link } from 'native-base';
import React, { useEffect, useState } from 'react';
import { AppState, Platform, Pressable, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../../assets/images';
import { handleLocation } from '../../../common/LocationHelper';
import { spacing } from '../../../common/variables';
import AvatarIcon from '../../../components/AvatarIcon';
import LocationRequiredModal from '../../../components/LocationRequiredModal';
import { setCategories, setCurrentLocation, setCurrentPosition } from '../../../store/userSlice';
import styles from './styles';
import colors from '../../../theme/colors';
let sub = null
export default function VendorHome(props) {
  const {navigation} = props;
  const {userData} = useSelector(state => state.user);
  const {name, profilePic, uid} = userData;
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [locationModal, setLocationModal] = useState(false);
  useEffect(() => {
    getCategories()
    callLocationPermission()
    // navigation.navigate('LocationSelectorScreen',{isVendor:true})
    return () => {
      //focusListener.remove();
      if(sub)
      sub.remove();
    };
  }, []);
  const getCategories = () => {
    firestore()
    .collection("Category")
    .get()
    .then((res)=>{
      const localData = []
      res.docs.map(doc=>localData.push(doc.data().categoryName))
      dispatch(setCategories(localData.sort((a,b)=>a-b)))
    })
  }
  const callLocationPermission = (getCurrent) => {
    handleLocation(()=>handleLocationAcceptance(getCurrent), handleLocationRejection);
    sub = AppState.addEventListener('change', () => {
      handleLocation(handleLocationAcceptance, handleLocationRejection);
    });
  }
  const handleNotNow = () => {
    setLocationModal(false);
  };
  const handleLocationRejection = () => {
    setLocationModal(true);
  };
  const handleLocationAcceptance = (getCurrent) => {
    setLocationModal(false);
    Geolocation.getCurrentPosition(
      value => {
        const location = {
          latitude: value.coords.latitude,
          longitude: value.coords.longitude,
        };
        dispatch(setCurrentPosition(location));
        getAddressFromCoordinates(location.latitude, location.longitude);
        if(getCurrent){
          console.log(getCurrent)
          navigation.navigate("MyListingScreen")
        }
      },
      error => {},
      {
        enableHighAccuracy: true,
      },
    );
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`,
      );
      const json = await response.json();
      dispatch(setCurrentLocation(json.results[0]?.formatted_address));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS == 'ios' ? inset.top : inset.top + spacing.small,
        },
      ]}>
      <View style={styles.topView}>
        <View>
          <Text style={styles.hello}>Dashboard</Text>
        </View>
        <AvatarIcon
          size={60}
          uri={profilePic}
          style={{borderColor: 'gray'}}
          defaultSource={images.defaultUser}
          //borderWidth={1}
        />
      </View>
      <Link
        mt={5}
        onPress={()=>{
            callLocationPermission(true)
        }}
        _text={{
          color: colors.appDefaultColor,
          textDecoration: 'none',
          fontWeight: '900',
          fontSize:22
        }}
        style={{
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.appDefaultColor,
        }}>
        Use Current Location
      </Link>
      <View style={styles.borderViewContainer}>
        <View style={styles.borderView}></View>
        <Text style={styles.or}> OR </Text>
        <View style={styles.borderView}></View>
      </View>
      {/* <View style={styles.searchContainer}>
        <Icon
          as={MaterialCommunityIcons}
          size="lg"
          name="map-marker-radius"
          color={'black'}
          alignSelf={"center"}
        />
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps={'always'}
          textInputProps={{
            //   onChangeText: (txt) => setAddress(txt),
            //   value: address,
            placeholderTextColor: 'gray',
            //value:address
          }}
          fetchDetails={true}
          styles={{
            textInput: {
              padding: 0,
              backgroundColor: "transparent",
              alignItems:'center',
            },
            container: {
              padding: 0,
              alignItems:'center',
              backgroundColor: "transparent",
            },
            textInputContainer: {
              padding: 0,
              alignItems:'center',
              backgroundColor: "transparent",
            },
          }}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            dispatch(
              setCurrentPosition({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              }),
            );
            dispatch(setCurrentLocation(data.description));
            navigation.navigate("MyListingScreen")
            //console.log(data.description)
            //   setAddress(data.description);
            //   setLoc({
            //     latitude: details.geometry.location.lat,
            //     longitude: details.geometry.location.lng,
            //   });
            //   const location = {
            //     latitude: details.geometry.location.lat,
            //     longitude: details.geometry.location.lng,
            //     latitudeDelta: 0.01,
            //     longitudeDelta: 0.01,
            //   };
            //   setLocaLocation(location);
            //   mapRef.current.animateToRegion(location, 2000);
          }}
          query={{
            key: 'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY',
            language: 'en',
            //components: 'country:us',
          }}
        />
      </View> */}
       <Pressable
          style={[styles.searchBox, {marginRight: 10}]}
          onPress={() => navigation.navigate('LocationSelectorScreen',{isVendor:true})}>
          <Icon
            as={MaterialCommunityIcons}
            size="lg"
            name="map-marker-radius"
            mr={5}
            color={'black'}
          />
          <Text style={styles.placeholder}>Search address</Text>
        </Pressable>
      <View style={styles.borderViewContainer}>
        <View style={styles.borderView}></View>
        <Text style={styles.or}> OR </Text>
        <View style={styles.borderView}></View>
      </View>
      <Link
        mt={5}
        onPress={()=>{
            navigation.navigate("VendorAllListing")
        }}
        _text={{
          color: colors.appDefaultColor,
          textDecoration: 'none',
          fontWeight: '900',
          fontSize:22
        }}
        style={{
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.appDefaultColor,
        }}>
        Show All Listings
      </Link>
     
      <LocationRequiredModal
        handleNotNow={handleNotNow}
        visible={locationModal}
        closeModal={() => setLocationModal(false)}
        handleLocation={() =>
          handleLocation(
            handleLocationAcceptance,
            handleLocationRejection,
            true,
          )
        }
      />
    </View>
  );
}
