import { Firebase } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export class FirebaseAuth extends Firebase {
  static signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      login_hint: 'user@example.com',
      prompt: 'select_account',
    });
    return signInWithPopup(this.auth, provider);
  }
}
