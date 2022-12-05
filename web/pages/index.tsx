import { FirebaseAuth } from '../utils/firebase/firebase-auth';

export default function Home() {
  const googleLoginHandler = () => {
    FirebaseAuth.signInWithGoogle()
      .then((res) => {
        console.log(res);
        return res.user.getIdToken(true);
      })
      .then((token) => {
        console.log(token);
      });
  };
  return (
    <div>
      <button onClick={googleLoginHandler}>Google Login</button>
    </div>
  );
}
