import React from 'react'
import { Text, View } from "react-native"
import fonts from '../../assets/fonts'
import { fontSizes } from "../common/variables"
const NoResults  = (props)=>{
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"black",fontSize:fontSizes.extraExtraSmall,fontFamily:fonts.regular}}>
               {props.title?props.title:"Nothing Found"}
            </Text>
        </View>
    )
}
export default NoResults