import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../../assets/images';
import MyButton from '../../../components/MyButton';
import { setCurrentLocation, setCurrentPosition } from '../../../store/userSlice';
import styles from './styles';

export default LocationSelectorScreen = props => {
  const {navigation,route} = props
  const isVendor = route?.params?.isVendor
  const fromAdHome = route?.params?.fromAdHome
  const mapRef = useRef(null);
  const placesRef = useRef()
  const {setLocationAllState, locationAllState} = props;
  const [address, setAddress] = useState('');
  const {latitude = 22.7196,longitude=70.8577} = useSelector(state=>state.user.currentPosition) ?? {}
  const [loc, setLoc] = useState({latitude,longitude});
  const dispatch = useDispatch()
  const [currentLocation,setCurrentLocationLoc] = useState({latitude : 22.7196,longitude:70.8577})
  const confirmPressed = () => {
    console.log(address,loc)
    if(address == '' || loc == null){
      return
    }
    dispatch(setCurrentLocation(address))
    dispatch(setCurrentPosition(loc))
    if(isVendor){
      navigation.navigate("MyListingScreen")
    }
    else
    navigation.goBack()
    
  };
  const setAddressInit = async(latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`,
      );
      const json = await response.json();
      // placesRef.current.setAddressText(json.results[0]?.formatted_address)
      setAddress(json.results[0]?.formatted_address);
    }
    catch(error){

    }
  }
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`,
      );
      const json = await response.json();
      placesRef.current.setAddressText(json.results[0]?.formatted_address)
      setAddress(json.results[0]?.formatted_address);
      setLoc({
        latitude: json.results[0]?.geometry.location.lat,
        longitude: json.results[0]?.geometry.location.lng
      });
      const location = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      //setLocaLocation(location);
    } catch (error) {
      console.error(error);
    }
  };
  const insets = useSafeAreaInsets()
  // const [localLocation, setLocaLocation] = useState({
  //   latitude: latitude,
  //   longitude: longitude,
  // });
  useEffect(()=>{
    Geolocation.getCurrentPosition(
      value => {
        const location = {
          latitude: value.coords.latitude,
          longitude: value.coords.longitude,
        };
        setCurrentLocationLoc(location)
        setAddressInit(latitude,longitude);
        setLoc({
          latitude,longitude
        })
      },
      error => {},
      {
        enableHighAccuracy: true,
      },
    );
  },[])
  useEffect(()=>{
    setLoc({latitude,longitude})
    const location = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current.animateToRegion(location, 2000);
  },[latitude])
  const useCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      value => {
        const location = {
          latitude: value.coords.latitude,
          longitude: value.coords.longitude,
        };
        dispatch(setCurrentPosition(location));
        dispatchLocationAddress(location.latitude, location.longitude);
      },
      error => {},
      {
        enableHighAccuracy: true,
      },
    );
  };
  const dispatchLocationAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`,
      );
      const json = await response.json();
      dispatch(setCurrentLocation(json.results[0]?.formatted_address));
      if(isVendor){
        navigation.navigate("MyListingScreen")
      }
      else
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{flex:1}}>
    <MapView
      key={'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY'}
      //style={{ flex: 1}}
      //customMapStyle={mapStyles}
      //tintColor="black"
      //userInterfaceStyle="dark"
      ref={mapRef}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onRegionChangeComplete={(event)=>{
        getAddressFromCoordinates(event.latitude,event.longitude)
      }}
      style={[styles.mapView]}
      >
       <Marker
          image={images.locationIcon}
          //draggable
          coordinate={currentLocation}
          //pinColor='blue'
      />
         {/* <Marker
          //image={images.locationIcon}
          draggable
          coordinate={loc}
          onDragEnd={(event)=>{
            getAddressFromCoordinates(event.nativeEvent.coordinate.latitude,event.nativeEvent.coordinate.longitude)
          }}
      /> */}
      </MapView>
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={images.marker} />
      </View>
      <View style={[styles.headingView,{paddingTop:Platform.OS == "ios" ?insets.top:10}]}>
        <TouchableOpacity
          style={styles.crossIconContainer}
          //disabled={fromAdHome}
          onPress={() => {
            navigation.goBack()
          }}>
          {
              // !fromAdHome &&
              <Icon as={MaterialCommunityIcons} name="chevron-left" size={'xl'} color={"gray.900"}/>
          }
        </TouchableOpacity>
        <GooglePlacesAutocomplete
          ref={placesRef}
          keyboardShouldPersistTaps={'always'}
          textInputProps={{
            //   onChangeText: (txt) => setAddress(txt),
            //   value: address,
            placeholderTextColor: 'gray',
            //value:address
          }}
          fetchDetails={true}
          styles={styles.autoCompleteStyles}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            //console.log(data.description)
            setAddress(data.description);
            setLoc({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            const location = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              // latitudeDelta: 0.01,
              // longitudeDelta: 0.01,
            };
            //setLocaLocation(location);
            mapRef.current.animateToRegion(location, 2000);
          }}
          query={{
            key: 'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY',
            language: 'en',
            //components: 'country:us',
          }}
        />
      </View>
      {/* {
        true &&
        <TouchableOpacity onPress={useCurrentLocation}>
          <Text style={styles.locInstead}>Use current location</Text>
        </TouchableOpacity>
      } */}
      <MyButton
        title={'Confim'}
        containerStyle={styles.confirmBtn}
        txtStyle={styles.confirmBtnTxt}
        onPress={() => confirmPressed()}
        //disabled={address == '' || loc == null}
      />
    </View>
  );
};
