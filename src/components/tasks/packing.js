import React, {useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Order from '@appComponents/tasks/order';

import {setOrders, getOrders} from '@slices/tasks';

import {fetchAllOrders} from '@services/fakeData';

import {GenerateOrders} from '@helpers/order';

import {flex1} from '@styles/global';

const keyExtractor = item => item.orderId;

const Packing = () => {
  const orders = useSelector(getOrders);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchOrders = () => {
    setIsFetching(true);

    fetchAllOrders()
      .then(res => {
        const orders = GenerateOrders(res);
        dispatch(setOrders(orders));
      })
      .catch(err => {
        Alert.alert('Error', 'Something went wrong.');
      })
      .finally(() => setIsFetching(false));
  };

  const renderOrder = ({item}) => <Order orderId={item.orderId} />;

  const data = Object.values(orders);
  const ordersPresent = data.length > 0;

  return (
    <View style={packingContainer}>
      {ordersPresent ? (
        <FlatList
          data={data}
          renderItem={renderOrder}
          onRefresh={fetchOrders}
          refreshing={isFetching}
          keyExtractor={keyExtractor}
        />
      ) : (
        <Text style={noOrders}>No Orders Present</Text>
      )}
    </View>
  );
};

const packingContainer = {
  ...flex1,
  marginVertical: 20,
};

const noOrders = {
  fontSize: 15,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 30,
};

export default Packing;
