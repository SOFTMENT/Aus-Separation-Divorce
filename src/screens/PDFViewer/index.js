import { View } from "native-base"
import Header from "../../components/Header"
import Pdf from "react-native-pdf";

const PDFViewer = ({navigation,route}) => {
    const {uri,title} = route.params
    return(
        <View style={{flex:1}}>
            <Header back={true} title={title} normalBack navigation={navigation}/>
            <Pdf
                    style={{flex:1,overflow:"hidden"}}
                    source={{ uri: uri, cache: true }}
                    fitPolicy={0}
                    onLoadComplete={(num,path)=>{
                        // setPath(path)
                    }}
                    onError={(error)=>console.log(error)}
                    trustAllCerts={false}
                />
        </View>
    )
}
export default PDFViewer