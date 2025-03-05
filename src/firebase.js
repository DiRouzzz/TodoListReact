import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAjrk6jR_2QdSPHaVMtLfIoEZM4fdzD8qU',
  authDomain: 'todolist-bcb65.firebaseapp.com',
  projectId: 'todolist-bcb65',
  storageBucket: 'todolist-bcb65.firebasestorage.app',
  messagingSenderId: '301043335195',
  appId: '1:301043335195:web:3f30a71426438166d938be',
  databaseURL:
    'https://todolist-bcb65-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
