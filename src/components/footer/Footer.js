import React from 'react';
import { CSVLink } from "react-csv";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import './footer.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddExpense from './AddExpense';
import { useNavigate  } from 'react-router-dom';
import SimCardDownloadRoundedIcon from '@mui/icons-material/SimCardDownloadRounded';




    export default function LabelBottomNavigation(props) {
        const [value, setValue] = React.useState('recents');
        const navigate = useNavigate ()


      
        const handleChange = (event, newValue) => {
          setValue(newValue);
        };

        const exportToCSV = () => {

        };
        
        
  return (

    <div className='footer'>
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange} align-itmes="bottom">
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
        onClick={()=>{
          navigate('/transactions')
        }}
      />
       <Fab  color="secondary" aria-label="add" fontSize="small">
        <AddIcon 
        onClick = {() => {
          navigate('/addexpenses')
        }}
          />
        
      </Fab>
      <BottomNavigationAction

        label="Download CSV"
        value="downloadcsv"
        icon={<SimCardDownloadRoundedIcon />}
        onClick={()=>{
        }}
      />
      {/* <BottomNavigationAction
        label="Total Expenses"
        value="totalexpenses"
        icon={<CalculateRoundedIcon />}
      /> */}
        </BottomNavigation>

    </div>
  );
}
