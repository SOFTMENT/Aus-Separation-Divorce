import { Platform } from 'react-native';

export default {
    backgroundColor:'white',
    whiteDark:"rgb(244,244,244)",
    appPrimary:'#51aca6',
    appDefaultColor:"#E50101",
    appSecondary:'#FD6B68',
    appPrimaryDark:'#3A6AB4',
    appPrimaryLight:'#EEF8F8',
    blackText:'#333',
    borderColor:'rgba(151, 151, 151, 0.58)',
    btnColor:'#B9296A',
    greyText:'#b8a9b1',
    darkGreyBtn:'rgba(255, 255, 255, 0.1)',
    ratingColor:'#ffc462',
    subText:'#A8A8A8',
    transparent:'transparent',
    white:'white',
    black:'black',
    grey:'grey',
    circle:'#fff7fc',
    modalBackgraound:Platform.OS == 'ios' ? 'rgba(0, 0, 0,0.6)' : 'rgba(0, 0, 0,0.5)',
};
