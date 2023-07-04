import { collection, addDoc } from "firebase/firestore";
import {db} from '../config/firebase';
import * as React from 'react';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import TotalExpenses from './TotalExpenses';
import { useNavigate } from "react-router-dom";



export default function AddExpense() {

  /** csv */
  const marginTop60 = {
    marginTop: 60
  };


  const marginTop20 = {
    marginTop: 10
  };


  const [itemValue, setItemValue] = useState();
  const [itemValueError, setItemValueError] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemNameError, setItemNameError] = useState(false);
  const [itemCategory, setItemCategory] = useState("");
  const [itemCategoryError, setItemCategoryError] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [itemTransactionTypeError, setItemTransactionTypeError] = useState(false);
  
  const navigate = useNavigate();

  const onItemValueChange = (e) => {
    const name = e.target.value;
    if(name==null || name === "") {
      setItemValueError(true);
    }
    if(name!==null && name!=="") {
      setItemValueError(false);
    }
    setItemValue(e.target.value);
  };

  const onItemNameChange = (e) => {
    const name = e.target.value;
    if(name==null || name === "") {
      setItemNameError(true);
    }
    if(name!==null && name!=="") {
      setItemNameError(false);
    }
    setItemName(name);
  }

  const onTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  }

  const onItemCategoryChange = (e) => {
    setItemCategory(e.target.value);
  }

  const addItemToFB = async (e) => {
      e.preventDefault();
    
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
        navigate("/transactions");
        //window.location.reload();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  return (
    <div style={marginTop60}>
    <form onSubmit={addItemToFB}> 
      <TextField
      error={itemNameError}
      helperText={itemNameError?"Invalid entry":""}
      required
      id="filled-required"
      label="Item description"
      defaultValue="Items Description"
      variant="filled"
      value = {itemName}
      onClick={onItemNameChange}
      onChange={onItemNameChange}
      style={marginTop20}
    />
    <br></br>

    <TextField
        type='number'
        required
        value={itemValue}
        id="filled-required"
        label="Amount"
        defaultValue="Amount"
        variant="filled"
        onChange={onItemValueChange}
        style={marginTop20}
        onClick={onItemValueChange}
        error = {itemValueError}
        helperText={itemValueError?"Invalid entry": ""}
      />

      <br></br>

      <FormControl sx={{ m: 1, minWidth: 220 }} style={marginTop20}>
        <InputLabel htmlFor="grouped-select">Item Category</InputLabel>
        <Select required value = {itemCategory} onChange={onItemCategoryChange} id="grouped-select" label="Item Category">
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
      <FormControl sx={{ m: 1, minWidth: 220 }} style={marginTop20}>
        <InputLabel htmlFor="grouped-select">Transation type</InputLabel>
        <Select id="grouped-select" required label="Transaction type" value = {transactionType} onChange = {onTransactionTypeChange}>
          <MenuItem value={"CREDIT"}>Credit</MenuItem>
          <MenuItem value={"DEBIT"}>Debit</MenuItem>
        </Select>
      </FormControl>
      <br />
      <Button type="submit" variant="contained" sx={{ m: 1, minWidth: 120 }}>Add Expense</Button>

    </form>
    </div>
  );
}