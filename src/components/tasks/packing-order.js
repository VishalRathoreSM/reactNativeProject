import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';

import {AppBtn} from '@sharedComponents/theme';

import {updateOrderProductStatus} from '@slices/orders';

import {GenerateFilteredProducts} from '@helpers/order';

import {productStatusTypes} from '@constants/order';

import {flex1, fRow} from '@styles/global';

const {emptyObj, emptyArr} = global;

const {picked, missing} = productStatusTypes;

const PackingOrder = ({state}) => {
  const dispatch = useDispatch();
  const {items = emptyArr, orderId} = state || emptyObj;

  const onStatusChange = (productId, status) => {
    dispatch(updateOrderProductStatus({orderId, productId, status}));
  };

  const renderProducts = (products, customStyle, disabled = false) => {
    return products.map(({name, productId, img: uri}) => (
      <View key={productId} style={customStyle}>
        <View>
          <Text>{name}</Text>
          <Image
            style={productImg}
            source={{
              uri,
            }}
          />
        </View>
        <View>
          <AppBtn
            style={markAsMissingS}
            onPress={
              disabled ? undefined : () => onStatusChange(productId, missing)
            }>
            <Text>Mark as missing</Text>
          </AppBtn>
          <AppBtn
            style={pickedS}
            onPress={
              disabled ? undefined : () => onStatusChange(productId, picked)
            }>
            <Text>Picked</Text>
          </AppBtn>
        </View>
      </View>
    ));
  };

  const {
    pickedProducts,
    notPickedProducts,
    missingProducts,
    outOfStockProducts,
  } = GenerateFilteredProducts(items);

  return (
    <ScrollView style={packingOrder}>
      {renderProducts(notPickedProducts, notPickedProductsS)}
      {renderProducts(missingProducts, missingProductsS)}
      {renderProducts(pickedProducts, pickedProductsS)}
      {renderProducts(outOfStockProducts, outOfStockProductsS, true)}
    </ScrollView>
  );
};

const packingOrder = {
  ...flex1,
  marginVertical: 15,
};

const product = {
  ...fRow,
  justifyContent: 'space-between',
  marginHorizontal: 10,
  marginVertical: 15,
  padding: 10,
};

const pickedProductsS = {
  ...product,
  backgroundColor: 'green',
};

const notPickedProductsS = {
  ...product,
  backgroundColor: 'white',
};

const missingProductsS = {
  ...product,
  backgroundColor: 'orange',
};

const outOfStockProductsS = {
  ...product,
  backgroundColor: 'grey',
};

const markAsMissingS = {
  backgroundColor: 'yellow',
  marginVertical: 5,
  padding: 5,
};

const pickedS = {
  backgroundColor: 'blue',
  marginHorizontal: 5,
  padding: 5,
};

const productImg = {
  height: 80,
  width: 80,
};

export default PackingOrder;
