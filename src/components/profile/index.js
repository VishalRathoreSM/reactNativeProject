import React from 'react';
import {Image, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppBtn, BoldText} from '@sharedComponents/theme';
import {onLogout} from '@sharedComponents/navbar';

import {getUser} from '@slices/auth';

import {flex1, flexC, textC} from '@styles/global';
import {green} from '@styles/colors';

const Index = () => {
  const {name, img} = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogout = () => onLogout(dispatch);

  return (
    <View style={profileC}>
      <Image
        style={profilePicture}
        source={{
          uri: img,
        }}
      />
      <BoldText>{name}</BoldText>
      <AppBtn style={logout} onPress={handleLogout}>
        <Text style={logoutText}>Logout</Text>
      </AppBtn>
    </View>
  );
};

const logout = {
  backgroundColor: green,
  width: '50%',
  padding: 10,
  marginVertical: 20,
  borderRadius: 5,
};
const logoutText = {
  ...textC,
};

const profileC = {
  ...flex1,
  ...flexC,
};

const profilePicture = {
  height: 200,
  width: 200,
  marginBottom: 20,
  borderRadius: 100,
};

export default Index;
