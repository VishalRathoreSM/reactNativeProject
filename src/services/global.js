import {Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';

global.isIOS = Platform.OS == 'ios';

global.emptyObj = {};

global.emptyArr = [];

global.emptyFn = () => {};

global.push = (key, data = null) => Actions[key](data);

global.pop = () => Actions.pop();
