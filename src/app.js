import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import store from '@store/index';

import Router from '@appComponents/router';

const {emptyArr} = global;

const App = () => {
  useEffect(() => {
    console.log(123);
    SplashScreen.hide();
  }, emptyArr);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
