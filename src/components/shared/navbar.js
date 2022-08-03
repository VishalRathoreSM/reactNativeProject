import React from 'react';
import {Alert} from 'react-native';

import {IconIcomoon} from '@sharedComponents/custom-icons';
import {AppBtn} from '@sharedComponents/theme';

import {setLoggedIn} from '@slices/auth';

import {logout} from '@constants/font-codes';

import {fs20} from '@styles/global';

const {emptyFn} = global;

export const onLogout = dispatch => {
  Alert.alert('Logout', 'Are you sure?', [
    {
      text: 'Logout',
      onPress: () => {
        dispatch(setLoggedIn(false));
      },
    },
    {
      text: 'Cancel',
      style: 'cancel',
      onPress: emptyFn,
    },
  ]);
};

export const TabIcon = (nav, name) => {
  const color = nav.isFocused() ? 'white' : 'black';

  return <IconIcomoon content={name} customStyle={{...fs20, color}} />;
};

export const LogoutIcon = ({dispatch}) => (
  <AppBtn onPress={() => onLogout(dispatch)}>
    <IconIcomoon content={logout} customStyle={customLogoutStyle} />
  </AppBtn>
);

const customLogoutStyle = {fontSize: 25, marginRight: 10};
