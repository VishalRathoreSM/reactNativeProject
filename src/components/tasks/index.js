import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, SafeAreaView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {AppBtn} from '@sharedComponents/theme';

import {setOrders} from '@slices/orders';

import {fetchAllOrders} from '@services/fakeData';

import {GenerateOrders} from '@helpers/order';

import {delivery, packing} from '@constants/routes';

import {flex1, flexC, fs20} from '@styles/global';
import {white, black} from '@styles/colors';

const {push, emptyArr} = global;

const taskTypes = [
  {
    route: packing,
    title: 'Packing',
  },
  {
    route: delivery,
    title: 'Delivery',
  },
];

const activityIndicatorProps = {
  size: 'large',
  color: black,
};

const Index = () => {
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllOrders()
      .then(res => {
        const orders = GenerateOrders(res);
        dispatch(setOrders(orders));
        setIsFetching(false);
      })
      .catch(err => {
        Alert.alert('Something went wrong');
      });
  }, emptyArr);

  return (
    <SafeAreaView style={tasks}>
      {isFetching ? (
        <ActivityIndicator {...activityIndicatorProps} />
      ) : (
        taskTypes.map(({route, title}) => (
          <View key={route}>
            <AppBtn style={taskBtn} onPress={() => push(route)}>
              <Text style={taskHeader}>{title}</Text>
            </AppBtn>
          </View>
        ))
      )}
    </SafeAreaView>
  );
};

const tasks = {
  ...flex1,
  ...flexC,
};

const taskBtn = {
  backgroundColor: black,
  marginVertical: 10,
  marginHorizontal: 20,
  padding: 20,
};

const taskHeader = {
  color: white,
  ...fs20,
};

export default Index;
