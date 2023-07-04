import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Expenses from './screens/Expenses';
// import CategoryExpenses from './screens/CategoryExpenses';
import AddExpense from './screens/AddExpense';
import ExportSelectorGrid from './components/footer/ExportCSV';
import Login from './screens/Login';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';


function App() {
  return (
    // <div className="App">
    //   <div>
    //     <Header />
    //   </div>
    //   <div>
    //   <Expenses />
    //   </div>
    //  <div>
    //   <Footer />
    //  </div>
    // </div>

    
    <div className="App">
       <div>
        <Header />
      </div>
      {/* <div>
      <ExportSelectorGrid/>
      </div> */}
      <Routes>
        { <Route path="/" element={   
          <AddExpense/> } />}
        <Route path="addexpenses" element={ <AddExpense/> } />
        {/* <Route path="category" element={ <CategoryExpenses/> } /> */}
        <Route path="transactions" element={  <Expenses/> } />
        <Route path="/login" element={<Login/>}/>
      </Routes>
     <div>
      <Footer />
     </div>
    </div>
    
   
   
  );
}

export default App;
