import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {geohashForLocation} from 'geofire-common';
import {Icon, ScrollView, Select, VStack, useDisclose} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Helper from '../../../common/Helper';
import Util from '../../../common/util';
import {spacing} from '../../../common/variables';
import Header from '../../../components/Header';
import LoaderComponent from '../../../components/LoaderComponent';
import MyButton from '../../../components/MyButton';
import MyTextInput from '../../../components/MyTextInput';
import PhotoPicker from '../../../components/PhotoPicker';
import colors from '../../../theme/colors';
import styles from './styles';
import {useIsFocused, useRoute} from '@react-navigation/native';
import branch from 'react-native-branch';

export default function AddListing(props) {
  const {navigation} = props;
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const [locationAllState, setLocationAllState] = useState({
    address: null,
    location: {},
  });
  const placesRef = useRef(null);
  const categories = useSelector(state => state.user.categories);
  const [about, setAbout] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState('');
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const {latitude, longitude} =
    useSelector(state => state.user.currentPosition) ?? {};
  const location = useSelector(state => state.user.currentLocation) ?? {};
  useEffect(() => {
    if (location) {
      placesRef.current.setAddressText(location);
      setLocationAllState({
        address: location,
        location: {
          latitude,
          longitude,
        },
      });
    }
  }, [location]);
  const handleImage = index => {
    Keyboard.dismiss();
    setIndex(index);
    onToggle();
  };
  const clearData = () => {
    setTitle('');
    setAbout('');
    setImages([]);
    setIndex(0);
    setCategory('');
    // setLocationAllState({
    //     address: null,
    //     location: {},
    // })
  };
  const selectImage = img => {
    if (img) {
      if (images?.[index] != undefined) {
        setImages(images.map((imgg, i) => (index == i ? img : imgg)));
      } else setImages([...images, img]);
    }
  };

  const handleAddSpace = async () => {
    // const labels = await ImageLabeling.label("https://firebasestorage.googleapis.com/v0/b/site-see-32c16.appspot.com/o/ListingIma);
    //     console.log(labels)
    //     return
    //const labels = await ImageLabeling.label(Platform.OS=="ios"?`file:///${img.path}`:img.path)
    //  const labels = await generateLabels()
    //  console.log(labels)
    //return
    if (!images[0]) {
      Util.showMessage('error', 'First image is compulsory');
    } else if (!title.trim()) {
      Util.showMessage('error', 'Please provide a valid title');
    } else if (!category) {
      Util.showMessage('error', 'Please select a category');
    } else if (!about.trim()) {
      Util.showMessage('error', 'Please provide a valid description');
    } else if (!locationAllState.address) {
      Util.showMessage('error', 'Please add a valid location');
    } else {
      try {
        setLoaderVisibility(true);
        const uid = auth().currentUser.uid;
        let spaceImages = [];
        const hash = geohashForLocation([
          locationAllState.location.latitude,
          locationAllState.location.longitude,
        ]);
        const ref = firestore().collection('Listing').doc();

        Promise.all(
          images.map((image, ind) => {
            return Helper.uploadImage(
              `ListingImage/${ref.id}_${ind + 1}.png`,
              image,
            );
          }),
        )
          .then(async listingImages => {
            let buo = await branch.createBranchUniversalObject(
              `item/${ref.id}`,
              {
                title,
                contentDescription: about,
                contentMetadata: {
                  customMetadata: {
                    key1: 'value1',
                  },
                },
              },
            );
            //   let linkProperties = {
            //     feature: 'sharing',
            //     channel: 'facebook',
            //     campaign: 'content 123 launch'
            //   }

            //   let controlParams = {
            //     $desktop_url: 'https://example.com/home',
            //     custom: 'data'
            //   }
            //   let shareOptions = {
            //     messageHeader: 'Check this out',
            //     messageBody: 'No really, check this out!'
            //   }
            let {url} = await buo.generateShortUrl();
            await ref.set({
              id: ref.id,
              listingImages,
              shareUrl:url,
              createTime: firebase.firestore.FieldValue.serverTimestamp(),
              title,
              supplierId: uid,
              about,
              category,
              geohash: hash,
              _geoloc: {
                lat: locationAllState?.location?.latitude ?? '',
                lng: locationAllState?.location?.longitude ?? '',
              },
              location: {
                address: locationAllState.address,
                lat: locationAllState?.location?.latitude ?? '',
                lng: locationAllState?.location?.longitude ?? '',
              },
            });
            Util.showMessage(
              'success',
              'Success',
              'Listing added successfully',
            );
            clearData();
            if(location)
              navigation.navigate('MyListingScreen');
            else
              navigation.navigate('VendorAllListing');
          })
          .finally(() => {
            setLoaderVisibility(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = index => {
    setImages(images.filter((img, i) => index != i));
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      nestedScrollEnabled={false}
      bounces={false}
      keyboardShouldPersistTaps={'always'}>
      <Header navigation={navigation} title="Add Listing" back />
      <View style={styles.mainView}>
        <TouchableOpacity
          style={styles.thumbnailView}
          onPress={() => handleImage(0)}>
          {images[0] ? (
            <FastImage
              source={{uri: images[0].uri}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          ) : (
            <VStack alignItems={'center'}>
              <Text style={styles.updateText} numberOfLines={1}>
                {images[0] ? images[0].name : 'Add Picture'}
              </Text>
              <Text style={styles.subtitle}>
                {'JPEG or PNG, no larger than 10 MB.'}
              </Text>
            </VStack>
          )}
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          {images.length > 1 &&
            images.slice(1).map((img, index) => {
              return (
                <TouchableOpacity
                  style={styles.addmore}
                  onPress={() => handleImage(index + 1)}>
                  <TouchableOpacity
                    onPress={() => handleClose(index + 1)}
                    style={{
                      position: 'absolute',
                      zIndex: 1000,
                      // backgroundColor:"rgba(0,0,0,0.5)",
                      // padding:5,
                      top: 2,
                      right: 2,
                    }}>
                    <Icon
                      name="close-circle-outline"
                      as={MaterialCommunityIcons}
                      size="md"
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <FastImage
                    source={{uri: img.uri}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          {images[0] && images.length < 10 && (
            <TouchableOpacity style={styles.addmore} onPress={handleImage}>
              <Icon name="plus" as={MaterialCommunityIcons} size="3xl" />
            </TouchableOpacity>
          )}
        </ScrollView>
        <MyTextInput
          containerStyle={{marginTop: 20}}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Name'}
          value={title}
          onChangeText={txt => setTitle(txt)}
          //keyboardType={"number-pad"}
        />
        <Text style={styles.title}>Listing location</Text>
        <GooglePlacesAutocomplete
          ref={placesRef}
          //keyboardShouldPersistTaps={'always'}
          textInputProps={{
            // onChangeText: (txt) => setAddress(txt),
            // value: address,
            placeholderTextColor: 'gray',
            //value:address
          }}
          fetchDetails={true}
          styles={{
            textInput: {
              borderRadius: 20,
              backgroundColor:colors.whiteDark
            },
          }}
          //styles={styles.autoCompleteStyles}
          placeholder={'Search address'}
          onPress={(data, details = null) => {
            setLocationAllState({
              ...locationAllState,
              address: data.description,
              location: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            });
          }}
          query={{
            key: 'AIzaSyA0s1sqV20wmXHfso3aF1Zl9b2Skw53SsY',
            language: 'en',
            //components: 'country:us',
          }}
        />
        <Text style={styles.title}>Select listing category</Text>
        <Select
          _actionSheet={{useRNModal: true}}
          accessibilityLabel="Select Category"
          placeholder="Select"
          //px={spacing.medium}
          bgColor={colors.whiteDark}
          py={Platform.OS == 'ios' ? 4 : 2}
          borderRadius={spacing.large}
          borderWidth={0}
          // borderColor={colors.borderColor}
          dropdownIcon={
            <Icon
              //bgColor={'white'}
              name="chevron-down"
              as={MaterialCommunityIcons}
              size="md"
              marginRight={3}
            />
          }
          selectedValue={category}
          color={'black'}
          onValueChange={itemValue => setCategory(itemValue)}>
          {categories.map((item, index) => {
            return <Select.Item key={index} value={item} label={item} />;
          })}
        </Select>

        {/* <Text style={styles.title}>Brief Description</Text> */}
        <MyTextInput
          numberOfLines={2}
          containerStyle={{marginTop: 20}}
          txtInputStyle={{height: 100, textAlignVertical: 'top'}}
          multiline={true}
          //iconName={"lock-outline"}
          //isPass
          placeholder={'Listing Description'}
          value={about}
          onChangeText={txt => setAbout(txt)}
          //keyboardType={"number-pad"}
        />

        <MyButton
          title={'Add Listing'}
          containerStyle={{
            marginTop: 20,
          }}
          txtStyle={{
            color: 'white',
          }}
          onPress={handleAddSpace}
        />
      </View>
      <PhotoPicker
        isOpen={isOpen}
        onClose={onClose}
        isVideo={false}
        setImage={selectImage}
        isTF={true}
      />
      <LoaderComponent
        visible={loaderVisibility}
        title={'Uploading pictures'}
      />
    </KeyboardAwareScrollView>
  );
}
