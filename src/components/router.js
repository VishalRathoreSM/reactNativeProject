import React from 'react';
import {useSelector} from 'react-redux';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '@appComponents/login';
import Profile from '@appComponents/profile';
import TasksList from '@appComponents/tasks';
import Packing from '@appComponents/tasks/packing';
import PackingOrder from '@appComponents/tasks/packing-order';
import Delivery from '@appComponents/tasks/delivery';
import {TabIcon} from '@sharedComponents/navbar';

import {getLoggedIn} from '@slices/auth';

import {profile as profileFC, task} from '@constants/font-codes';
import {
  root,
  login,
  tabRoot,
  tasks,
  profile,
  packingOrder,
  packing,
  delivery,
} from '@constants/routes';

import {white, theme} from '@styles/colors';
import {fs20} from '@styles/global';

const {isIOS} = global;

const AppRouter = () => {
  const loggedIn = useSelector(getLoggedIn);
  return (
    <Router headerLayoutPreset="center">
      <Stack key={root}>
        <Scene
          key={login}
          initial={!loggedIn}
          titleStyle={tabTitle}
          component={Login}
          title="Login"
        />

        <Scene
          key={tabRoot}
          hideNavBar
          tabs
          initial={loggedIn}
          activeBackgroundColor={theme}
          // tabBarStyle={scene}
          showLabel={false}>
          <Scene
            key={tasks}
            component={TasksList}
            initial={loggedIn}
            title="Tasks"
            titleStyle={tabTitle}
            icon={({navigation}) => TabIcon(navigation, task)}
          />
          <Scene
            key={profile}
            component={Profile}
            title="Profile"
            titleStyle={tabTitle}
            icon={({navigation}) => TabIcon(navigation, profileFC)}
          />
        </Scene>
        <Scene
          key={packing}
          back={true}
          // renderLeftButton={isIOS ? '' : null}
          component={Packing}
          title="Packing"
          {...taskSceneProps}
        />
        <Scene
          key={packingOrder}
          back={true}
          component={PackingOrder}
          {...taskSceneProps}
          title="Products"
        />
        <Scene
          key={delivery}
          back={true}
          component={Delivery}
          {...taskSceneProps}
          title="Delivery"
        />
      </Stack>
    </Router>
  );
};

const tabTitle = {
  fontSize: 25,
};

const taskSceneProps = {
  titleStyle: {
    color: white,
    ...fs20,
  },
  navigationBarStyle: {backgroundColor: theme},
  backButtonTintColor: white,
};

export default AppRouter;
