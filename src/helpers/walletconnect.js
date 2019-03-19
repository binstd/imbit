// import RNWalletConnect from 'rn-walletconnect-wallet';

// import { Alert } from 'react-native'

// import { asyncStorageLoadSessions, asyncStorageSaveSession, asyncStorageDeleteSession } from './asyncStorage';

// const walletConnectors = {};

// function setWalletConnector(sessionId, walletConnector) {
//   walletConnectors[sessionId] = walletConnector;
//   return true;
// }

// function getWalletConnector(sessionId) {
//   const walletConnector = walletConnectors[sessionId];
//   return walletConnector;
// }

// //创建
// async function generateWalletConnector(session) {
//   console.log('session::',session); 
//   const walletConnector = new RNWalletConnect({ ...session });
//   return walletConnector;
// }

// export async function walletConnectNewSession(uri) {
//   //uri为扫码获取的数据

//   // 创建 RNWalletConnect :: generateWalletConnector
//   const walletConnector = await generateWalletConnector({ uri });

//   const { sessionId } = walletConnector;

//   setWalletConnector(sessionId, walletConnector);

//   //address 信息在此处修改
//   const session = await walletConnectApproveSession(sessionId);
  
//   return session;
// }

// //  为session发起 RNWalletConnect
// export async function walletConnectGetLiveSessions() {
//   const liveSessions = {};
//   let savedSessions = {};
//   try {
//      //获取 AsyncStorage保存的 session
//     savedSessions = await asyncStorageLoadSessions();
//     console.log('savedSessions', savedSessions);
//   } catch (err) {
//     console.error(err);
//     console.log('Error: Async Storage Load Sessions Failed', err);
//   }
  
//   const savedSessionIds = savedSessions ? Object.keys(savedSessions) : [];
//   console.log('savedSessionIds', savedSessionIds);
//   //删除过期session
//   if (savedSessions && savedSessionIds.length) {
//     try {
//       await Promise.all(savedSessionIds.map(async sessionId => {
//         const now = Date.now();
        
//         // 获取session
//         const session = savedSessions[sessionId];
//         //判断ssesion是否过期
//         if (session.expires > now) {
//           liveSessions[sessionId] = session;
//         } else {
//           try {
//               //过期就删除 
//             console.log('过期就删除 ');
//             await asyncStorageDeleteSession(session);
//           } catch (err) {
//             console.log('Error: Async Storage Delete Session Failed', err);
//           }
//         }
//       }));
//     } catch (err) {
//       console.error(err);
//       console.log('Error: Filtering Saved Sessions Failed', err);
//     }

//     // 获取存活session
//     const liveSessionIds = liveSessions ? Object.keys(liveSessions) : {};
//     console.log('liveSessionIds', liveSessionIds);
//     if (liveSessions && liveSessionIds.length) {
//       try {
//         await Promise.all(liveSessionIds.map(async sessionId => {
//           const session = liveSessions[sessionId];
           
//           //为session发送请求 
//           console.log("初始化的RNWalletConnect, session值是: \n",session);
//           const walletConnector = await generateWalletConnector(session);

//           setWalletConnector(sessionId, walletConnector);
//           console.log('session', session);
//         }));
//       } catch (err) {
//         console.error(err);
//         console.log('Error: Filtering Live Sessions Failed', err);
//       }
//     }
//   }
//     return liveSessions;
// }



// export function walletConnectGetSessionData(sessionId) {
//   const walletConnector = getWalletConnector(sessionId);
//   return walletConnector.toJSON();
// }


// //处理
// export async function walletConnectApproveSession(sessionId) {
//   const address = 'luz32324n34354545454545liang'//await loadAddress();
//   const walletConnector = getWalletConnector(sessionId);
//   try {
//     const result = await walletConnector.approveSession({ accounts:[address] });
//     // console.log('approveSession ??', result);
//     return result;
//   } catch (err) {
//     // console.log('Error: Approve WalletConnect Session Failed', err);
//   }
// }


// export async function walletConnectGetCallRequest(sessionId, callId) {
//   const walletConnector = getWalletConnector(sessionId);
//   try {
//     const result = await walletConnector.getCallRequest(callId);
//     console.log('getCallRequest', result);
//     const callData = result.data;
//     console.log('callData', callData);
//     return callData;
//   } catch (err) {
//     console.log('Error: Get WalletConnect Call Request Failed', err);
//   }
// }

// export async function walletConnectApproveCallRequest(sessionId, callId, result) {
//   const walletConnector = getWalletConnector(sessionId);
//   try {
//     const res = await walletConnector.approveCallRequest(callId, result);
//     console.log('approveCallRequest', res);
//   } catch (err) {
//     console.log('Error: Approve WalletConnect Call Request Failed', err);
//   }
// }

// export async function walletConnectRejectCallRequest(sessionId, callId) {
//   const walletConnector = getWalletConnector(sessionId);
//   try {
//     const res = await walletConnector.rejectCallRequest(callId);
//     console.log('rejectCallRequest', res);
//   } catch (err) {
//     console.log('Error: Reject WalletConnect Call Request Failed', err);
//   }
// }
