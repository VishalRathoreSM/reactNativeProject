import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {BoldText} from '@sharedComponents/theme';

import {packingOrder} from '@constants/routes';

import {orderListing} from '@styles/colors';

const {push} = global;

const OrderInfo = ({label, content}) => (
  <Text>
    <BoldText>{label} -</BoldText> {content}
  </Text>
);

const getOrder = id => state => state.orders[id];

const Order = ({orderId}) => {
  const order = useSelector(getOrder(orderId));

  const {
    pkgCode,
    totalPrice,
    items,
    invoiceNo,
    user: {name, address},
  } = order;

  const onPress = () => push(packingOrder, {state: order});

  return (
    <View style={orderWrapper}>
      <Pressable onPress={onPress}>
        <>
          <OrderInfo label="Packing Code" content={pkgCode} />
          <OrderInfo label="Invoice No" content={invoiceNo} />
          <OrderInfo label="Name" content={name} />
          <OrderInfo label="Address" content={address} />
          <OrderInfo label="Items Qty" content={items.length} />
          <OrderInfo label="Total Price" content={totalPrice} />
        </>
      </Pressable>
    </View>
  );
};

const orderWrapper = {
  padding: 10,
  backgroundColor: orderListing,
  marginVertical: 8,
  marginHorizontal: 16,
};

export default Order;
