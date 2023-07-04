import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
          setLoading(false);
          return children;
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
          setLoading(false);
          return  <Navigate to="/login" />;
        }
      });
    })
    
     
  }

export default PrivateRoute