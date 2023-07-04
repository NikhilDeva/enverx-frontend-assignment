import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SouthWestRoundedIcon from '@mui/icons-material/SouthWestRounded';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import AddExpense from './AddExpense';
import ListExpenses from './ListExpenses';
import { collection, getDocs } from "firebase/firestore";
import {auth, db} from '../config/firebase';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export default function ListDividers() {

  const [transactions, setTransactions] = useState([]);
  
  const navigate = useNavigate();
 
  const fetchTransactions = async () => {
    await getDocs(collection(db, "transactions"))
      .then((querySnapshot)=>{
          const transactions = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
          setTransactions(transactions);
          console.log(transactions);
      })
  }
   
    useEffect(()=>{
        fetchTransactions();
    }, [])

  //   useEffect(()=>{
  //     onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //           // User is signed in, see docs for a list of available properties
  //           // https://firebase.google.com/docs/reference/js/firebase.User
  //           const uid = user.uid;
  //           // ...
  //           console.log("uid", uid)
  //         } else {
  //           // User is signed out
  //           // ...
  //           console.log("user is logged out")
  //           navigate('/login');
  //         }
  //       });
       
  // }, [])

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListExpenses />
    </List>
    
  );
}