import PropTypes from 'prop-types';
import React from 'react';
import {connectInfiniteHits} from 'react-instantsearch-native';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveSize} from '../../../common/util';
import {fontSizes, itemSizes, spacing} from '../../../common/variables';
import SpaceCard from '../../UserScreens/SpaceCard';
import FastImage from 'react-native-fast-image';
import { VStack } from 'native-base';
import images from '../../../assets/images';
import colors from '../../../theme/colors';
import fonts from '../../../../assets/fonts';
import UserProductCard from '../../UserScreens/UserProductCard';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 10,
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },
  card: {
    padding: spacing.medium,
    paddingVertical: spacing.semiMedium,
    borderRadius: spacing.small,
    flexDirection: 'row',
    marginBottom: spacing.extraSmall,
    alignItems: 'center',
  },
  linkIcon: {
    width: itemSizes.item20,
    height: itemSizes.item20,
  },
  linkText: {
    marginHorizontal: spacing.medium,
    flex: 1,
    color: 'white',
    fontFamily: 'Nunito Sans',
    fontSize: fontSizes.extraSmall,
  },
  empCard: {
    flex: 1,
    padding: spacing.small,
    paddingVertical: spacing.medium,
    borderWidth: 1,
    borderColor: 'rgba(112, 124, 151, 0.5)',
    marginBottom: 10,
    borderRadius: spacing.small,
  },
  subCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.extraSmall,
    flex: 0.8,
  },
  bottomCard: {
    flex: 1,
    //backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: spacing.small,
  },
  employeeImageView: {
    width: itemSizes.item60,
    height: itemSizes.item60,
    borderRadius: itemSizes.item30,
    // borderWidth:1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  employeeImage: {
    width: itemSizes.item60,
    height: itemSizes.item60,
  },
  icon: {
    width: itemSizes.item30,
    height: itemSizes.item30,
  },
  img:{
    width:"100%",
    aspectRatio:1,
    borderRadius:spacing.semiMedium
},
title:{
    color:colors.white,
    fontFamily:fonts.medium,
    fontSize:fontSizes.extraSmall
},
});

const InfiniteHits = ({hits, hasMore, refineNext, navigation, props}) => {
  const {favorites} = useSelector(state => state.user);
  const RenderItem = ({item}) => {
    return(
      <UserProductCard item={item} favorites={favorites} navigation={navigation}/>
    )
  };
  // if(hits.length == 0){
  //  return  props.firstLoad?<CenteredLoader/>: <NoResults/>
  // }
  return (
    <FlatList
      data={hits}
      numColumns={2}
      bounces={false}
      keyExtractor={item => item.objectID}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => hasMore && refineNext()}
      renderItem={props => <RenderItem {...props} />}
      style={styles.container}
    />
  );
};

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refineNext: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);
