import React, { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import "./footer.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddExpense from "../../screens/AddExpense";
import { useNavigate } from "react-router-dom";
import SimCardDownloadRoundedIcon from "@mui/icons-material/SimCardDownloadRounded";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function LabelBottomNavigation(props) {
  const [transactionData, setTransactionData] = useState([]);
  const csvLink = useRef()
  const [value, setValue] = React.useState("recents");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const downloadCSV = async  () => {
    handleClickOpen();
    await getDocs(collection(db, "transactions"))
      .then((querySnapshot)=>{
          const transactions = querySnapshot.docs
              .map((doc) => ({...doc.data(), id:doc.id }));
              setTransactionData(transactions);
          console.log(transactions);
          setOpen(false);
      })
    csvLink.current.link.click()
  };

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAgree = () => {
    
    downloadCSV();
  };

  const handleCloseDisagree = () => {
    setOpen(false);
  };

  return (
    <div className="footer">
      <BottomNavigation
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
        align-itmes="bottom"
      >
        {/* <BottomNavigationAction
        label="Category"
        value="category"
        icon={<ChecklistRoundedIcon />}
        onClick = {() => {
          navigate('/category')
        }}
      /> */}
        <BottomNavigationAction
          label="Transactions"
          value="transations"
          icon={<SyncAltRoundedIcon />}
          onClick={() => {
            navigate("/transactions");
          }}
        />
        <Fab color="secondary" aria-label="add" fontSize="small" onClick={() => {
          navigate("/addexpenses");
        }}>
          <AddIcon
          />
        </Fab>
        <BottomNavigationAction
          label="Download CSV"
          value="downloadcsv"
          icon={<SimCardDownloadRoundedIcon />}
          onClick={handleClickOpen}
        />
        <CSVLink
         data={transactionData}
         filename='transactions.csv'
         className='hidden'
         ref={csvLink}
         target='_blank'
        />
        <Dialog
        open={open}
        onClose={handleCloseDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to download CSV?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            CSV would contain all the list of transactions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisagree}>Cancel</Button>
          <Button onClick={handleCloseAgree} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
        {/* <BottomNavigationAction
        label="Total Expenses"
        value="totalexpenses"
        icon={<CalculateRoundedIcon />}
      /> */}
      </BottomNavigation>
    </div>
  );
}
