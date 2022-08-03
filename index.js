import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';

import '@services/global';
import App from '@root/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
