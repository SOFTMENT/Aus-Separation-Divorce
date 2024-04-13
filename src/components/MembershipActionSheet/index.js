import {Actionsheet, Box, HStack, Icon, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import MyButton from '../MyButton';
import { spacing } from '../../common/variables';
const MemberShipActionSheet = ({isOpen, onClose,memberShipCallback}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleMembership = () => {
    memberShipCallback({
      selectedMembership:selectedTab == 0?'monthly':'yearly'
    })
    onClose()
  }
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text
            fontSize="16"
            fontWeight={'bold'}
            color="black"
            _dark={{
              color: 'black',
            }}>
            Choose Your Plan
          </Text>
        </Box>
        <TouchableOpacity 
            onPress={()=>{
                setSelectedTab(0)
            }}
            style={[styles.btn,selectedTab == 0 && {borderWidth:2}]}>
          <VStack>
            <HStack justifyContent={'space-between'}>
              <Text
                color={'gray.500'}
                fontWeight={'thin'}
                fontSize={'xs'}
                mb={2}>
                {'M O N T H L Y'}
              </Text>
              <Icon
                as={MaterialCommunityIcons}
                name={selectedTab == 0 ? 'circle-slice-8' : 'circle-outline'}
                color={colors.appDefaultColor}
                size={'md'}
              />
            </HStack>
            <Text fontWeight={'semibold'}>{'$9.99/month'}</Text>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity 
             onPress={()=>{
                setSelectedTab(1)
             }}
            style={[styles.btn,selectedTab == 1 && {borderWidth:2}]}>
          <HStack justifyContent={'space-between'}>
            <Text color={'gray.500'} fontWeight={'thin'} fontSize={'xs'} mb={2}>
              {'Y E A R L Y'}
            </Text>
            <Icon
              as={MaterialCommunityIcons}
              name={selectedTab == 1 ? 'circle-slice-8' : 'circle-outline'}
              color={colors.appDefaultColor}
              size={'md'}
            />
          </HStack>
          <Text fontWeight={'semibold'}>{'$99.99/year'}</Text>
        </TouchableOpacity>
        <MyButton
            title={"Continue"}
            onPress={()=>{
              handleMembership()
            }}
            containerStyle={{
                width:"90%",
                borderRadius:spacing.large
            }}
            txtStyle={{color:"white"}}
        />
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export default MemberShipActionSheet;
