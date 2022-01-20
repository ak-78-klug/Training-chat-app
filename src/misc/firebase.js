import { Notification as Toast } from 'rsuite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: 'AIzaSyDZMLUhoIx6-puUc7W_KShg9FEeYfeEdQ8',
  authDomain: 'react-chat-web-app-a4b74.firebaseapp.com',
  projectId: 'react-chat-web-app-a4b74',
  storageBucket: 'react-chat-web-app-a4b74.appspot.com',
  messagingSenderId: '468415121118',
  appId: '1:468415121118:web:cfb17811d12fc72641644f',
};

export const fcmVapidKey =
  'BK-u1Blj12JeNuLwgrxNhJyVOZZxTtw88JRm6dZUbbUjxLtoUsgyYDJRXycJxOD1JFGZaeOMqRqCUUEeGcKBPDM';

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west3');

export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
