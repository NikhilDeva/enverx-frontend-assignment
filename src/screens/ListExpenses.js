import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SouthWestRoundedIcon from '@mui/icons-material/SouthWestRounded';
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded';
import AddExpense from '../components/footer/AddExpense';
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import firebase from "firebase/firestore";
import {db} from '../config/firebase';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {doc} from "firebase/firestore";

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



    const handleDelete = async (id) => {
      console.log("clicked");
      
      try{
        await deleteDoc(doc(db,"transactions", id));
      console.log("record deleted");
      window.location.reload();
      // update your state or anything you want to do after deletion
      }
      catch(error){
      console.log(error.message);
      }
  }
  
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {
        transactions.map((transaction) => 
        <ListItem button>
          <Grid container>
            {/* <Grid item xs={4}></Grid> */}
            <Grid item xs={10}>
              <ListItemText primary={transaction.itemName} />
            </Grid>
            {/* <Grid item xs={1}> 
              <div>
                  <NorthEastRoundedIcon />
              </div>
              </Grid> */}
              <Grid item xs={1}> 
              <div>
                  Rs.{transaction.itemValue}
              </div>
              </Grid>
              <Grid item xs={1}>
              <div onClick={()=>handleDelete(transaction.id)}>
                <DeleteOutlineIcon/>
              </div>
            </Grid>
          </Grid>
        </ListItem>
        )
      }
      
      
    </List>
    
  );
}