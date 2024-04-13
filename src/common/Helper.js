import DocumentPicker,{ types } from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs'
import ImageCropPicker from 'react-native-image-crop-picker';
export default {
    // async pickDocument(image) {
    //     try {
    //         const result = await DocumentPicker.pick({
    //             allowMultiSelection: false,
    //             type: image ? [types.images] : [types.video],
    //             copyTo: "documentDirectory"

    //         })
    //         console.log(result[0].fileCopyUri)
    //         return {name:result[0].name,uri:result[0].fileCopyUri,type:result[0].type}
    //     } catch (error) {
    //         console.log(error)
    //         if (DocumentPicker.isCancel(error)) {
    //             throw "Please select a file"
    //             // User cancelled the picker, exit any dialogs or menus and move on
    //         }
    //         throw "something went wrong"
    //     }

    // },
    async pickDocument() {
        try {
            const result = await DocumentPicker.pick({
                allowMultiSelection: false,
                type: [types.doc,types.docx,types.images,types.pdf],
                copyTo: "documentDirectory"

            })
            console.log(result[0].fileCopyUri)
            return {name:result[0].name,uri:result[0].fileCopyUri,type:result[0].type}
        } catch (error) {
            console.log(error)
            if (DocumentPicker.isCancel(error)) {
                throw "Please select a file"
                // User cancelled the picker, exit any dialogs or menus and move on
            }
            throw "something went wrong"
        }

    },
    async imageUrlToBase64(imageUrl) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const base64data = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result.split(',')[1]);
              reader.onerror = (error) => reject(error);
              reader.readAsDataURL(blob);
            });
            const dataType = 'image'; // Replace with the appropriate data type
            const fileExtension = 'png'; // Replace with the actual file extension
            return `data:${dataType}/${fileExtension};base64,${base64data}`;
          } catch (error) {
            console.error('Error converting image to base64:', error);
            throw error;
          }
      },
    async pickVideo(image) {
        try {
            const result = await DocumentPicker.pick({
                allowMultiSelection: false,
                type: image ? [types.images] : [types.video],
                copyTo: "documentDirectory"

            })
            console.log(result[0].fileCopyUri)
            return result[0]
        } catch (error) {
            console.log(error)
            if (DocumentPicker.isCancel(error)) {
                throw "Please select a file"
                // User cancelled the picker, exit any dialogs or menus and move on
            }
            throw "something went wrong"
        }

    },
    async pickImageTF() {
        try {
            const result = await ImageCropPicker.openPicker({
                width:224,
                height:224,
                cropping:true,
                mediaType:"photo",
                //mediaType:
            })
            return {...result,uri:result.path}
        } catch (error) {
            console.log(error)
        }
    },
    async pickImage(isCover) {
        try {
            const result = await ImageCropPicker.openPicker({
                width:400,
                height:isCover?225:400,
                cropping:true,
                mediaType:"photo",
                //mediaType:
            })
            return {...result,uri:result.path}
        } catch (error) {
            console.log(error)
        }
    },
    async pickVideo() {
        try {
            const result = await ImageCropPicker.openPicker({
               mediaType:"video"
            })
            return {...result,uri:result.path}
        } catch (error) {
            
        }
    },
    async openCamera(isCover,multiple) {
        try {
            const result = await ImageCropPicker.openCamera({
                width:400,
                height:isCover?225:400,
                cropping:true,
                mediaType:"photo",
            })
            return {...result,uri:result.path}
        } catch (error) {
            console.log(error)
        }
    },
    async openCameraVideo() {
        try {
            const result = await ImageCropPicker.openCamera({
               mediaType:"video"
            })
            return {...result,uri:result.path}
        } catch (error) {
            
        }
    },
    async pickImageMultiple(isCover) {
        try {
            const result = await ImageCropPicker.openPicker({
                width:400,
                height:isCover?225:400,
                cropping:true,
                mediaType:"photo",
                multiple:true
                //mediaType:
            })
            console.log(result)
            return {...result,uri:result.path}
        } catch (error) {
            
        }
    },
    async openCameraMultiple(isCover) {
        try {
            const result = await ImageCropPicker.openCamera({
                width:400,
                height:isCover?300:400,
                cropping:true,
                mediaType:"photo",
                multiple:true
            })
            return {...result,uri:result.path}
        } catch (error) {
            
        }
    },
    uploadImage : async(imageLoc,source)=>{
        //console.log(source,imageLoc)
        return new Promise(async(resolve,reject)=>{
            if(!source.uri){
                return resolve(source)
            }
            const reference = storage().ref(imageLoc); 
            const data = await RNFS.readFile(decodeURI(source.uri), 'base64')
            await reference.putString(data,"base64",{
                contentType:source.mime ?? source.type ?? null,

            })
            const url = await reference.getDownloadURL()
            return resolve(url)
        })
        
    }
}