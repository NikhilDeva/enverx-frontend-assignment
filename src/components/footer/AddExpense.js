import { collection, addDoc } from "firebase/firestore";
import {db} from '../../config/firebase';
import * as React from 'react';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import TotalExpenses from '../../screens/TotalExpenses';



export default function AddExpense() {
  const [itemValue, setItemValue] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const onItemValueChange = (e) => {
    setItemValue(e.target.value);
  };

  const onItemNameChange = (e) => {
    setItemName(e.target.value);
  }

  const onTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  }

  const onItemCategoryChange = (e) => {
    setItemCategory(e.target.value);
  }

  const addItemToFB = async () => {
    
      console.log("ITEM Value is");
      console.log(itemValue);
      console.log(itemCategory);
      console.log(itemName);
      console.log(transactionType);
      // backend call to FB
      try {
        const docRef = await addDoc(collection(db, "transactions"), {
          itemValue: itemValue,
          itemCategory: itemCategory,
          itemName: itemName,
          transactionType: transactionType    
        });
        console.log("Document written with ID: ", docRef.id);
        //window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  return (
    <div >
        {/* <TotalExpenses /> */}
        <div>
        <TextField
          required
          id="filled-required"
          label="Item description"
          defaultValue="Items Description"
          variant="filled"
          value = {itemName}
          onChange={onItemNameChange}
        />
        </div>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel htmlFor="grouped-select">Item Category</InputLabel>
        <Select value = {itemCategory} onChange={onItemCategoryChange} id="grouped-select" label="Item Category">
            <MenuItem value={"GROCERY"}>Grocery</MenuItem>
            <MenuItem value={"RENT"}>Rent</MenuItem>
            <MenuItem value={"INSURANCE"}>Insurance</MenuItem>
            <MenuItem value={"TAXES"}>Taxes</MenuItem>
            <MenuItem value={"CHILD_CARE"}>Child care</MenuItem>
            <MenuItem value={"TRANSPORTATION"}>Transportation</MenuItem>
            <MenuItem value={"OTHERS"}>Others</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel htmlFor="grouped-select">Transation type</InputLabel>
        <Select id="grouped-select" label="Transaction type" value = {transactionType} onChange = {onTransactionTypeChange}>
          <MenuItem value={"CREDIT"}>Credit</MenuItem>
          <MenuItem value={"DEBIT"}>Debit</MenuItem>
        </Select>
      </FormControl>
      <div>
        <TextField
          required
          value={itemValue}
          id="filled-required"
          label="Amount"
          defaultValue="Amount"
          variant="filled"
          onChange={onItemValueChange}
        />
        </div>
        <div>
            <Button onClick={addItemToFB} variant="contained" sx={{ m: 1, minWidth: 120 }}>Add Expense</Button>
        </div>

        
    </div>
  );
}