import React, {useEffect} from 'react';
import {Alert, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Products from '@appComponents/tasks/products';
import {AppBtn} from '@sharedComponents/theme';

import {updateOrderProductStatus, getOrder, removeOrder} from '@slices/tasks';

import {GenerateFilteredProducts} from '@helpers/order';

import {bold, flex1, fRow, fs20, textC} from '@styles/global';
import {white, green, disabledC} from '@styles/colors';

const {emptyObj, emptyArr, pop} = global;

const PackingOrder = ({navigation, orderId}) => {
  const order = useSelector(getOrder(orderId));
  const dispatch = useDispatch();
  const {items = emptyArr} = order || emptyObj;

  const {
    pickedProducts,
    notPickedProducts,
    missingProducts,
    outOfStockProducts,
  } = GenerateFilteredProducts(items);

  useEffect(() => {
    navigation.setParams({
      title: `Items To Be Picked - ${items.length - pickedProducts.length}`,
    });
  }, [pickedProducts.length]);

  const onSubmit = () => {
    Alert.alert('Success', 'Task Completed', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(removeOrder(orderId));
          pop();
        },
      },
    ]);
  };

  const onStatusChange = (productId, status) => {
    dispatch(updateOrderProductStatus({orderId, productId, status}));
  };

  const allItemsPicked = items.length === pickedProducts.length;

  return (
    <ScrollView style={packingOrder}>
      <Products
        items={notPickedProducts}
        customStyle={notPickedProductsS}
        onStatusChange={onStatusChange}
      />
      <Products
        items={missingProducts}
        customStyle={missingProductsS}
        onStatusChange={onStatusChange}
      />
      <Products
        items={pickedProducts}
        customStyle={pickedProductsS}
        onStatusChange={onStatusChange}
      />
      <Products
        items={outOfStockProducts}
        customStyle={outOfStockProductsS}
        onStatusChange={onStatusChange}
        disabled
      />
      <AppBtn
        onPress={onSubmit}
        style={[submit, {backgroundColor: allItemsPicked ? green : disabledC}]}>
        <Text style={submitText}>Submit</Text>
      </AppBtn>
    </ScrollView>
  );
};

const packingOrder = {
  ...flex1,
  marginVertical: 15,
};

const submit = {
  marginHorizontal: 10,
  padding: 10,
};

const submitText = {
  ...textC,
  ...bold,
  ...fs20,
  color: white,
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

export default PackingOrder;
