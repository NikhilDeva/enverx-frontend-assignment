import * as React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from '@mui/material';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const navigate = useNavigate();
  

  const loginWithGoogle = () => {
    
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user);
      console.log(token);
      navigate('/');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(error);
    });

  }



  return (
    <div>
    <h1>Login</h1>
    <Button onClick={loginWithGoogle}>Login with Google</Button>
    </div>
  );
}