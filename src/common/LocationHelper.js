import { Linking, PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service'
export const handleLocation = (handleLocationAcceptance,handleLocationRejection,fromPopup) => {
    const requestLocationPermissionAndroid = async () => {
        console.log("here")
        try {
            const result = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                ],
                {
                    title: 'Appvertise App Location Permission',
                    message:
                        'Appvertise App needs access to your location ' +
                        'so we can show you nearby vendors.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            //console.log(result)
            if (result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED ||
                result['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED) {
                handleLocationAcceptance()
            } 
            // else if(result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
            // result['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            //     Linking.openSettings()
            // }
            else{
                if(fromPopup)
                Linking.openSettings()
                else
                handleLocationRejection()
            }
        } catch (err) {
            console.log(err)
            console.warn(err);
        }
    };
    const handleLocationPermissionIos = () => {
        Geolocation.requestAuthorization("whenInUse")
            .then((value) => {
                console.log(value)
                if (value == "granted") {
                    handleLocationAcceptance()
                }
                else {
                    if(fromPopup)
                    Linking.openSettings()
                    else
                    handleLocationRejection()
                }
            })
    }
    if (Platform.OS == "ios") {
        handleLocationPermissionIos()
    }
    else {
        requestLocationPermissionAndroid()
    }
}