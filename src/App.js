import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Expenses from './screens/Expenses';
// import CategoryExpenses from './screens/CategoryExpenses';
import AddExpense from './components/footer/AddExpense';
import ExportSelectorGrid from './components/footer/ExportCSV';


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
      {/* <Route path="/" element={ <Expenses/> } /> */}
        <Route path="addexpenses" element={ <AddExpense/> } />
        {/* <Route path="category" element={ <CategoryExpenses/> } /> */}
        <Route path="transactions" element={ <Expenses/> } />
      </Routes>
     <div>
      <Footer />
     </div>
    </div>
    
   
   
  );
}

export default App;
