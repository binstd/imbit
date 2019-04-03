import firebase from 'react-native-firebase';
// import { addCallRequest } from '../redux/_callRequests';
// import { showCallRequestModal } from '../navigation';
import { walletConnectGetSessionData } from './walletconnect-old';

let MessageListener = null;
let NotificationListener = null;
let NotificationDisplayedListener = null;
let NotificationOpenedListener = null;

export async function initFCM() {
//   console.log('\n \n <-- 初.始.化 firebase.initFCM ---> \n \n ');
  await requestPermissions();
  await registerListeners();
  await getFCMToken();
}

export async function getFCMToken() {
  const fcmToken = await firebase.messaging().getToken();
//   console.log('FCM TOKEN ===>', fcmToken);
  return fcmToken;
}

export async function requestPermissions() {
  try {
    await firebase.messaging().requestPermission();
    console.log('Permissions granted');
  } catch (error) {
    console.log('Failed requesting permissions');
    console.error(error);
  }
}

export async function registerListeners() {
  console.log('\n \n onMessage => ', onMessage);  
  MessageListener = firebase.messaging().onMessage(onMessage);
  NotificationListener = firebase.notifications().onNotification(onNotification);
  NotificationDisplayedListener = firebase.notifications().onNotificationDisplayed(onNotificationDisplayed);
  NotificationOpenedListener = firebase.notifications().onNotificationOpened(onNotificationOpened);

  console.log('FCM Listeners succesfully registered');
}

export async function unregisterListeners() {
  await MessageListener();
  await NotificationListener();
  await NotificationDisplayedListener();
  await NotificationOpenedListener();
  console.log('FCM Listeners succesfully unregistered');
}

async function onCallRequest(notification) {
  const { sessionId, callId } = notification.data;
  const { dappName } = walletConnectGetSessionData(sessionId);
   console.log('删除了 redux的一个方法 \n');
//   await addCallRequest(sessionId, callId);
//   await showCallRequestModal({ sessionId, callId, dappName });
}

async function onMessage(message) {
  try {
    console.log('FCM onMessage  =====>', message);
    await onCallRequest(message);
  } catch (error) {
    console.error(error);
  }
}

async function onNotification(notification) {
  try {
    console.log('FCM onNotification  =====>', notification);
    await onCallRequest(notification);
  } catch (error) {
    console.error(error);
  }
}

async function onNotificationDisplayed(notification) {
  try {
    console.log('FCM onNotificationDisplayed =====>', notification);
    await onCallRequest(notification);
  } catch (error) {
    console.error(error);
  }
}

async function onNotificationOpened(notificationOpened) {
  try {
    console.log('FCM onNotificationOpened =====>', notificationOpened);
    const { notification } = notificationOpened;
    await onCallRequest(notification);
  } catch (error) {
    console.error(error);
  }
}
