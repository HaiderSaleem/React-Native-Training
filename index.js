/**
 * @format
 */
import { AppRegistry } from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import { name as appName } from './app.json';

PushNotification.configure({
  onNotification(notification) {
    console.log('NOTIFICATION:', notification);
  },
});
AppRegistry.registerComponent(appName, () => App);
