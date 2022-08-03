import React from 'react';
import {Pressable, Text} from 'react-native';

import {bold} from '@styles/global';

const {emptyObj} = global;

export const AppBtn = ({children, ...rest}) => {
  return <Pressable {...rest}>{children}</Pressable>;
};

export const BoldText = ({children, customStyle = emptyObj}) => (
  <Text style={[bold, customStyle]}>{children}</Text>
);
