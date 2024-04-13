import { Linking } from "react-native"

export default {
     makeCall(phone){
        Linking.openURL(`tel:${phone}`)
    },
    openBrowser(link){
        if(link.startsWith('www.'))
            link = 'https://'+link
        else if(link.startsWith("https://")  || link.startsWith("http://")){}
        else {link = 'https://www.'+link}
        Linking.openURL(`${link}`)
    },
    openMail(mail){
        Linking.openURL(`mailto:${mail}`)
    },
    openSms(phone){
        Linking.openURL(`sms:${phone}`)
    }
}