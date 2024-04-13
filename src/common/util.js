import { forEach } from 'lodash';
import { Dimensions, PixelRatio, Platform } from 'react-native';

import Toast from 'react-native-toast-message';
// import { getInset } from "react-native-safe-area-view";
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const Util = {
    checkIfTablet : () => {
        const pixelDensity = PixelRatio.get()
        const adjustedWidth = SCREEN_WIDTH * pixelDensity
        const adjustedHeight = SCREEN_WIDTH * pixelDensity
        if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
            return true
        } else {
            return (
                pixelDensity === 2 &&
                (adjustedWidth >= 1920 || adjustedHeight >= 1920)
            )
        }
        },    
    showMessage: (type, text1, text2, onPress) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            props: {
                onPress
            }
        });
    },
    getHeight: percente => {
        percente = !percente ? 100 : percente;
        return (Util.getWindowSize().height * percente) / 100;
    },
    getWidth: percente => {
        percente = !percente ? 100 : percente;
        return (Util.getWindowSize().width * percente) / 100;
    },
    getWindowSize: () => Dimensions.get('window'),
    isIphonex: () => {
        const { width, height } = Util.getWindowSize()
        return Util.isIphone() && (height >= 812 || width >= 812);
    },
    isIphone8: () => {
        const { width, height } = Util.getWindowSize()
        return Util.isIphone() && (height < 812 || width <812);
    },
    isIphone: () => {
        return Platform.OS === 'ios'
    },
    genRandomId: () => {
        function makeidChar(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        function makeidNum(length) {
            var result = '';
            var characters = '0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        let str1 = makeidNum(5)
        let str2 = makeidChar(2)
        const shuffle = str => [...str].sort(() => Math.random() - .5).join('');
        return shuffle(str1 + str2)
    },
    getFormattedDate: (date) => {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return (dd + '/' + mm + '/' + yyyy)
    },
    getNameInitial: (name) => {
        const nameArray = name.split(" ")
        return nameArray[0].toUpperCase().charAt(0)+(nameArray[1]?.toUpperCase().charAt(0) ?? "")
    },
    getCapitalName: () => {
        
    },
    calculateRating : (ratingObj,ratingCount) => {
        if(ratingCount == 0) {
            return 0
        }
        let rating = 0
        Object.keys(ratingObj).map(key=>{
            rating+=key*ratingObj[key]
        })
        rating = rating / ratingCount
        return Math.round(rating * 10) / 10
    },
    getUserType : (tab) => {
        switch(tab){
            case 1 : {
                return "User"
            }
            case 2 : {
                return "Advertiser"
            }
            // case 3 : {
            //     return "Service Provider"
            // }
        }
    } 
}
export default Util
export function responsiveSize(size) {
    const isTablet = Util.checkIfTablet()
   	// NOTE: Tablet scaling hasn't been fully tested.
	const newSize = isTablet ? (size * scale) / 2 : size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
    // const { width, height } = Util.getWindowSize();
    // return (Math.sqrt((height * height) + (width * width)) * (fontSize / sizeDenominator));
}
export function getRegionForCoordinates(points) {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;
  
    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);
  
    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });
  
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);
  
    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }