import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import TimeAgo from 'javascript-time-ago';
import {
  HStack,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  useDisclose
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import images from '../../assets/images';
import Helper from '../../common/Helper';
import Util from '../../common/util';
import AvatarHeader from '../../components/AvatarHeader';
import PhotoPicker from '../../components/PhotoPicker';
import styles from './styles';
import colors from '../../theme/colors';
const Chat = props => {
  const {userData, navigation, route} = props;
  const {params} = route;
  const timeAgo = new TimeAgo('en-US');
  const [lastMessage, setLastMessage] = useState(params.lastMessage);
  const [chats, setChats] = useState([]);
  const uid = auth().currentUser.uid;
  const {isOpen, onToggle, onClose, onOpen} = useDisclose();
  const handleImage = index => {
    onToggle();
  };
  const selectImage = img => {
    if (img) {
      sendImage(img);
    }
  };
  useEffect(() => {
    if (lastMessage) {
      const {senderUid} = lastMessage;
      if(lastMessage.regarding){
       handleImageWithText(lastMessage)
      }
      getRecipientData(senderUid);
      const unsubscribe = firestore()
        .collection('Chats')
        .doc(uid)
        .collection(senderUid)
        .orderBy('date', 'desc')
        .onSnapshot(querySnapshot => {
          const chats = [];
          querySnapshot.forEach(doc => {
            chats.push({...doc.data(), id: doc.id});
          });
          setChats(chats);
        });
      return unsubscribe;
    }
  }, []);
  const getRecipientData = async senderUid => {
    const res = await firestore().collection('Users').doc(senderUid).get();
    const data = res.data();
    setLastMessage({
      ...lastMessage,
      senderImage: data.profilePic,
      senderName: data.name,
    });
  };
  const navigateToListing = (item) => {
    console.log(item)
    try {
      firestore()
      .collection("Listing")
      .doc(item.listingId)
      .get()
      .then((res)=>{
        console.log("here",item)
        if(res.exists){
          navigation.navigate("VendorListingDetail",{item:res.data()})
        }
      })
    } catch (error) {
      
    }
  }
  const renderChats = ({item}) => {
    if (item.senderUid == uid)
    return  item.isImgWithText?
   <View>
     <View 
      style={[styles.rightMsg,{backgroundColor:colors.black,borderRadius:10,width:200}]}>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={[styles.rightImage,{borderWidth:0}]}
          resizeMode="cover"
        />
        <Text style={[styles.txt,{padding:10}]}>
          {item.message}
        </Text>
      </View>
       <Text style={[styles.timeAgoRight]}>
       {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
     </Text>
   </View>
    : item.message ? (
      <View style={styles.rightMsg}>
        <View style={styles.rightMsgInner}>
          <Text style={styles.txt}>{item.message}</Text>
        </View>
        <Text style={[styles.timeAgoRight]}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    ) : (
      <View>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={styles.rightImage}
          resizeMode="cover"
        />
        <Text style={[styles.timeAgoRight,{marginBottom:10}]}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    );
    return(
    item.isImgWithText?
    <TouchableOpacity onPress={()=>navigateToListing(item)}>
     <View 
      style={[styles.leftMsg,{backgroundColor:colors.black,borderRadius:10,width:200}]}>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={[styles.leftImage,{borderWidth:0}]}
          resizeMode="cover"
        />
        <Text style={[styles.txt,{padding:10}]}>
          {item.message}
        </Text>
      </View>
       <Text style={[styles.timeAgoLeft]}>
       {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
     </Text>
   </TouchableOpacity>
    :
    item.message ? (
      <View style={styles.leftMsg}>
        <View style={styles.leftMsgInner}>
          <Text style={styles.txt}>{item.message}</Text>
        </View>
        <Text style={styles.timeAgoLeft}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    ) : (
      <View>
        <FastImage
          defaultSource={images.imagePlaceholder}
          source={{uri: item.img}}
          style={styles.leftImage}
          resizeMode="cover"
        />
        <Text style={[styles.timeAgoLeft,{marginBottom:10}]}>
          {item.date?.toDate() ? timeAgo.format(item.date?.toDate()) : ''}
        </Text>
      </View>
    ))
  };
  const keyExtractor = item => {
    return item.id;
  };

  const setMessage = (messageId, senderUid, recUid, messageObj) => {
    try {
      firestore()
        .collection('Chats')
        .doc(senderUid)
        .collection(recUid)
        .doc(messageId)
        .set(messageObj);
    } catch (error) {
      console.log(error);
      Util.showMessage('error', 'Something went wrong');
    }
  };
  const sendImage = async (img,isUri) => {
    try {
      let docId = firestore().collection('Chats').doc().id;
      const imgUri = isUri ? img:await Helper.uploadImage(
        `ChatImage/${uid}/${docId.png}`,
        img,
      );
      const messageObj = {
        img: imgUri,
        senderUid: uid,
        messageId: docId,
        //senderImage:profilePic,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        //senderName: name
      };
      setMessage(docId, uid, lastMessage.senderUid, messageObj);
      setMessage(docId, lastMessage.senderUid, uid, messageObj);
      // setMessage(lastMessage.senderUid, uid, "LastMessage", {
      //     message: chatText.trim(),
      //     senderUid: lastMessage.senderUid,
      //     isRead: true,
      //     //senderImage:lastMessage.senderImage,
      //     //senderName: lastMessage.senderName,
      //     date: firebase.firestore.FieldValue.serverTimestamp(),
      // })
      // setMessage(uid, lastMessage.senderUid, "LastMessage", {
      //     message: chatText.trim(),
      //     senderUid: uid,
      //     isRead: false,
      //     //senderImage:profilePic,
      //     //senderName: name,
      //     date: firebase.firestore.FieldValue.serverTimestamp(),
      // })
      //setChatText("")
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageWithText = async () => {
    try {
      console.log(lastMessage)
      let docId = firestore().collection('Chats').doc().id;
      const messageObj = {
        img: lastMessage.imageUri,
        senderUid: uid,
        messageId: docId,
        message:lastMessage.regarding,
        isImgWithText:true,
        listingId:lastMessage.listingId,
        //senderImage:profilePic,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        //senderName: name
      };
      setMessage(docId, uid, lastMessage.senderUid, messageObj);
      setMessage(docId, lastMessage.senderUid, uid, messageObj);
      setMessage(lastMessage.senderUid, uid, "LastMessage", {
          message: lastMessage.regarding,
          senderUid: lastMessage.senderUid,
          isRead: true,
          //senderImage:lastMessage.senderImage,
          //senderName: lastMessage.senderName,
          date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setMessage(uid, lastMessage.senderUid, "LastMessage", {
          message: lastMessage.regarding,
          senderUid: uid,
          isRead: false,
          //senderImage:profilePic,
          //senderName: name,
          date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      //setChatText("")
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = chatText => {
    //setChatText(chatText.trim())
    if (chatText.trim().length > 0) {
      try {
        let docId = firestore().collection('Chats').doc().id;
        const messageObj = {
          message: chatText.trim(),
          senderUid: uid,
          messageId: docId,
          //senderImage:profilePic,
          date: firebase.firestore.FieldValue.serverTimestamp(),
          //senderName: name
        };
        setMessage(docId, uid, lastMessage.senderUid, messageObj);
        setMessage(docId, lastMessage.senderUid, uid, messageObj);
        setMessage(lastMessage.senderUid, uid, 'LastMessage', {
          message: chatText.trim(),
          senderUid: lastMessage.senderUid,
          isRead: true,
          //senderImage:lastMessage.senderImage,
          //senderName: lastMessage.senderName,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessage(uid, lastMessage.senderUid, 'LastMessage', {
          message: chatText.trim(),
          senderUid: uid,
          isRead: false,
          //senderImage:profilePic,
          //senderName: name,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });
        //setChatText("")
      } catch (error) {
        console.log(error);
      }
    }
  };
  //console.log(lastMessage)
  const RenderHeader = () => {
    const [chatText, setChatText] = useState('');
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <HStack style={styles.inputBox} alignItems={'center'}>
          <TextInput
            style={{flex: 1, color: 'black',maxHeight:100}}
            value={chatText}
            // onSubmitEditing={() => {
            //   handleSubmit(chatText);
            //   setChatText('');
            // }}
            onChangeText={txt => setChatText(txt)}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder={'Type Here'}
            //returnKeyType="send"
            placeholderTextColor={'gray'}
            multiline={true}
            //editable={chatActive}
          />
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="camera"
                size={'2xl'}
                color="black"
              />
            }
            onPress={handleImage}
          />
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="send-circle"
                size={'2xl'}
                color="black"
              />
            }
            onPress={() => {
              handleSubmit(chatText);
              setChatText('');
            }}
          />
        </HStack>
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={styles.container}>
      <AvatarHeader
        rightIcon={'dots-vertical'}
        rightIsComponent={true}
        back
        title={lastMessage.senderName}
        navigation={navigation}
        icon={lastMessage.senderImage}
      />

      <FlatList
        inverted
        renderItem={renderChats}
        data={chats}
        //style={{flex:1}}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        bounces={false}
        showsVerticalScrollIndicator={false}
        //ListHeaderComponent={<RenderHeader/>}
        keyboardShouldPersistTaps={'handled'}
      />
      <RenderHeader />
      <PhotoPicker
        isOpen={isOpen}
        onClose={onClose}
        isVideo={false}
        setImage={selectImage}
        isCover={true}
      />
    </View>
  );
};
const mapStateToProps = state => {
  return {
    userData: state.user.userData,
  };
};
export default connect(mapStateToProps)(Chat);
