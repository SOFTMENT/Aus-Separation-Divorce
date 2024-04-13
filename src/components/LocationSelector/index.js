import { Icon } from 'native-base'
import React, { useRef, useState } from 'react'
import { Modal, TouchableOpacity, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Marker } from 'react-native-maps'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MyButton from '../MyButton'
import styles from './styles'
import { useDispatch } from 'react-redux'
import { setCurrentLocation } from '../../store/userSlice'
export default LocationSelector = (props) => {
  const mapRef = useRef(null)
  const { setLocationAllState, locationAllState } = props
  const [localLocation, setLocaLocation] = useState({
    latitude: 22.7196,
    longitude: 70.8577,
    visible: false
  })
  const [address, setAddress] = useState("")
  const [loc, setLoc] = useState(null)
  const dispatch = useDispatch()
  const confirmPressed = () => {
    // dispatch(setCurrentLocation)
    // dispatch(setCurrentLocation())
  }
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
        console.log("here")
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY`);
      const json = await response.json();
      setAddress(json.results[0]?.formatted_address);
      //console.log(json.results[0])
      return json?.results[0]
      // return json.movies;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal
      visible={locationAllState.visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.headingView}>
            <GooglePlacesAutocomplete
              keyboardShouldPersistTaps={"always"}
              textInputProps={
                {
                //   onChangeText: (txt) => setAddress(txt),
                //   value: address,
                  placeholderTextColor: "gray",
                  //value:address
                }
              }
              fetchDetails={true}
              styles={
                styles.autoCompleteStyles
              }
              placeholder={"Search address"}
              onPress={(data, details = null) => {
                //console.log(data.description)
                setAddress(data.description)
                setLoc({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                })
                const location = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
                setLocaLocation(location)
                mapRef.current.animateToRegion(location, 2000)
              }}
              query={{
                key: "AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY",
                language: 'en',
                //components: 'country:us',
              }}

            />
            <TouchableOpacity
              style={styles.crossIconContainer}
              onPress={() => { setLocationAllState({ ...locationAllState, visible: false }) }}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="close-circle"
                size={"md"}
              />
            </TouchableOpacity>
          </View>
          <MapView
            key={"AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY"}
            //style={{ flex: 1}}
            //customMapStyle={mapStyles}
            //tintColor="black"
            //userInterfaceStyle="dark"
            ref={mapRef}
            initialRegion={{
              latitude: 22.7196,
              longitude: 70.8577,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapView}
            onPress={(event) => {
            //   // event.target.
            //   setLoc({
            //     ...localLocation,
            //     latitude: event.nativeEvent.coordinate.latitude,
            //     longitude: event.nativeEvent.coordinate.longitude
            //   })
            //   setLocaLocation({
            //     ...localLocation,
            //     latitude: event.nativeEvent.coordinate.latitude,
            //     longitude: event.nativeEvent.coordinate.longitude
            //   })
            //   getAddressFromCoordinates(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude)
            }}
          >
            <Marker
              //draggable
              coordinate={localLocation}
            // onDragEnd={(event)=>{
            //   console.log(event.nativeEvent.)
            // }}
            />
          </MapView>

          <MyButton
            title={"Confirm"}
            containerStyle={[styles.confirmBtn]}
            //txtStyle={styles.confirmBtnTxt}
            onPress={() => confirmPressed()}
          />
        </View>
      </View>
    </Modal>

  )
} 