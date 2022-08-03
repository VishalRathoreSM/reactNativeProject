import React from 'react';
import {View} from 'react-native';

import {BoldText} from '@sharedComponents/theme';

import {flex1, flexC, fs20} from '@styles/global';

const Delivery = () => {
  return (
    <View style={deliveryContainer}>
      <BoldText customStyle={comingSoon}>Coming Soon...</BoldText>
    </View>
  );
};

const deliveryContainer = {
  ...flex1,
  ...flexC,
};

const comingSoon = {
  ...fs20,
};

export default Delivery;
