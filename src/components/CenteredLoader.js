import { ActivityIndicator, View } from "react-native"
import React from 'react'
import colors from "../theme/colors"
const CenteredLoader  = (props)=>{
    const {isSmall} = props
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:colors.backgroundColor}}>
            <ActivityIndicator color={colors.appPrimary} size={isSmall?"small":"large"}/>
        </View>
    )
}
export default CenteredLoader