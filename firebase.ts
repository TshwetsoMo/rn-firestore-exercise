// firebase.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJkF4cG9D0k7IWy5rnI9egs_wgunjzdps',
  authDomain: 'bucketlistapp-b4ac4.firebaseapp.com',
  projectId: 'bucketlistapp-b4ac4',
  storageBucket: 'bucketlistapp-b4ac4.appspot.com',
  messagingSenderId: '143538895797',
  appId: '1:143538895797:web:18d93e2ab08a50996d37fc',
};

// If no app initialize one, else reuse it:
const app: FirebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

// **One** Firestore initializer: we’ll force long-polling here
// and then export it. Don’t ever call getFirestore() anywhere else.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});