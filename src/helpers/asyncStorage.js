import { AsyncStorage } from 'react-native';

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
