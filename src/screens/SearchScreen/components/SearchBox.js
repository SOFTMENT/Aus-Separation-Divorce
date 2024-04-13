import { HStack, IconButton, Input } from 'native-base';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-native';
import { Platform, StyleSheet, View } from 'react-native';
import Header from '../../../components/Header';
import Util, { responsiveSize } from '../../../common/util';
import { itemSizes, spacing } from '../../../common/variables';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../../../theme/colors';
const styles = StyleSheet.create({
    container: {
        marginHorizontal:spacing.medium
        // flex:1,
        // backgroundColor:colors.backgroundColor
    },
});

const SearchBox = ({ currentRefinement, refine, backImage, navigation }) => {
    const [value,setValue] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.mainView}>
                <HStack space={2} mb={5}>
                    <Input
                        placeholder="Search"
                        variant="outlined"
                        flex={1}
                        _focus={{borderColor:colors.appPrimary}}
                        borderRadius={30}
                        bgColor={"white"}
                        py={Platform.OS=="ios"?4:2}
                        color={"black"}
                        borderWidth={1}
                        borderColor={colors.appPrimary}
                        //bg={"gray.800"}
                        onChangeText={(txt)=>setValue(txt)}
                        value={value}
                        onSubmitEditing={()=>refine(value)}
                        autoFocus
                    />
                    <IconButton
                        //variant={"solid"}
                        bg={colors.appPrimary}
                        borderRadius={10}
                        // borderWidth={1}
                        // borderColor={"gray.400"}
                        onPress={()=>refine(value)}
                        _icon={{
                            size: "xl",
                            name: "magnify",
                            color: "white",
                            marginLeft: spacing.extraExtraSmall,
                            as: MaterialCommunityIcons
                        }}
                    />
                </HStack>
            </View>
        </View>
    )
};

SearchBox.propTypes = {
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);
