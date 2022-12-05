import { FirebaseApp, initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

export class Firebase {
  private static _firebaseApp: FirebaseApp;

  protected static get instance() {
    if (!!this._firebaseApp) {
      return this._firebaseApp;
    } else {
      console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
      this._firebaseApp = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      });
      return this._firebaseApp;
    }
  }

  protected static get auth() {
    const auth = getAuth(this.instance);
    auth.languageCode = 'ko';
    return auth;
  }
}
