import React from 'react';

import {IconIcomoon} from '@sharedComponents/custom-icons';
import {AppBtn} from '@sharedComponents/theme';

import {logout} from '@constants/font-codes';
import {login} from '@constants/routes';

import {fs20} from '@styles/global';

const {push} = global;

const onLogout = () => push(login);

export const TabIcon = (nav, name) => {
  const color = nav.isFocused() ? 'white' : 'black';

  return <IconIcomoon content={name} customStyle={{...fs20, color}} />;
};

export const LogoutIcon = () => (
  <AppBtn onPress={onLogout}>
    <IconIcomoon content={logout} customStyle={customLogoutStyle} />
  </AppBtn>
);

const customLogoutStyle = {fontSize: 25, marginRight: 10};
