import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SouthWestRoundedIcon from '@mui/icons-material/SouthWestRounded';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import AddExpense from '../components/footer/AddExpense';
import ListExpenses from './ListExpenses';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../config/firebase';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export default function ListDividers() {

  const [transactions, setTransactions] = useState([]);
 
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

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListExpenses />
    </List>
    
  );
}