/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { CLARITY_ID } from './src/constants/configs';
import { initialize } from 'react-native-clarity';

// if (Platform.OS === 'android') {
//   initialize(CLARITY_ID);
// }



AppRegistry.registerComponent(appName, () => App);
