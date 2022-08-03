import React from 'react';
import {View, Text, Image} from 'react-native';

import {AppBtn} from '@sharedComponents/theme';

import {productStatusTypes} from '@constants/order';
import {disabledC} from '@root/assets/styles/colors';

const {picked, missing} = productStatusTypes;

const defaultImageUri =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60';

const Products = ({items, customStyle, disabled = false, onStatusChange}) => {
  return items.map(({name, productId, img: uri}) => (
    <View key={productId} style={customStyle}>
      <View>
        <Text>{name}</Text>
        <Image
          style={productImg}
          source={{
            uri: uri || defaultImageUri,
          }}
        />
      </View>
      <View>
        <AppBtn
          style={[
            markAsMissingS,
            {backgroundColor: disabled ? disabledC : 'red'},
          ]}
          onPress={
            disabled ? undefined : () => onStatusChange(productId, missing)
          }>
          <Text>Mark as missing</Text>
        </AppBtn>
        <AppBtn
          style={[pickedS, {backgroundColor: disabled ? disabledC : 'green'}]}
          onPress={
            disabled ? undefined : () => onStatusChange(productId, picked)
          }>
          <Text>Picked</Text>
        </AppBtn>
      </View>
    </View>
  ));
};

const markAsMissingS = {
  marginVertical: 5,
  padding: 5,
};

const pickedS = {
  marginHorizontal: 5,
  padding: 5,
};

const productImg = {
  height: 80,
  width: 80,
};

export default Products;
