import { AsyncStorage } from 'react-native';
import userModel from '../model/userModel';

import TouchID from 'react-native-touch-id';
//保存 AsyncStorage  AsyncStorage.setItem
export async function asyncStorageSave(key, value) {
  const jsonValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`AsyncStorage: saved value for key: ${key}`);
  } catch (err) {
    console.log(`AsyncStorage: failed to save value for key: ${key} error: ${err}`);
  }
}
// 获取AsyncStorage值 AsyncStorage.getItem
export async function asyncStorageLoad(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
    //   console.log(`AsyncStorage: loaded value for key: ${key}`);
      const jsonValue = JSON.parse(data);
      return jsonValue;
    }
    // console.log(`AsyncStorage: value does not exist for key: ${key}`);
  } catch (err) {
    // console.log(`AsyncStorage: failed to load value for key: ${key} error: ${err}`);
  }
  return null;
}

//删除 asyncStorageDelete  AsyncStorage.removeItem(
export async function asyncStorageDelete(key) {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`AsyncStorage: removed value for key: ${key}`);
  } catch (err) {
    console.log(`AsyncStorage: failed to remove value for key: ${key} error: ${err}`);
  }
}

const asyncStorageId = 'walletConnect';

//保存一个session
export async function asyncStorageSaveSession(session) {
  let sessions = {};
  // AsyncStorage.getItem   walletConnect  
  const prevSessions = await asyncStorageLoad(asyncStorageId);
  if (prevSessions) {
    sessions = { ...prevSessions };
  }
  sessions[session.sessionId] = session;
  //保存session
  await asyncStorageSave(asyncStorageId, sessions);
  return true;
}


//获取session
export async function asyncStorageLoadSessions() {
  const savedSessions = await asyncStorageLoad(asyncStorageId);
  return savedSessions;
}

export async function asyncStorageDeleteSession(session) {
  const sessions = await asyncStorageLoad(asyncStorageId);
  if (sessions) {
    if (sessions[session.sessionId]) {
      delete sessions[session.sessionId];
    }
  }
  await asyncStorageSave(asyncStorageId, sessions);
  return true;
}


export async function authTouchID(authTypeMassage) {
    const optionalConfigObject = {
        title: '授权操作:', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: '请进行指纹识别', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: '取消', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    
    // transactionModel.tokenInfo;
    let switchOn = userModel.openTouchId;
    if( switchOn === true) {
        let authenticate = await TouchID.authenticate(authTypeMassage, optionalConfigObject);
        // console.log(authenticate);
        if( authenticate ) {
            return true;
            console.log('true');
        } else {
            console.log('false');
            return false;
       
        }
    }else{
        console.log('true');
        return true;
    }
}