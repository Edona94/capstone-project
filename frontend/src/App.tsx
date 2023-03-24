import React from 'react';
import './App.css';
import useEmployees from "./hooks/useEmployees";
import {Route, Routes} from "react-router-dom";
import EmployeeGallery from "./component/EmployeeGallery";
import AddEmployee from "./component/AddEmployee";
import EmployeeDetails from "./component/EmployeeDetails";


function App() {
  const {employees,postNewEmployee,deleteEmployee} = useEmployees()
  return (
    <div className="App">
      <Routes>
          <Route path={"/"} element={<EmployeeGallery employees={employees}/>}/>
          <Route path={"/employees"} element={<EmployeeGallery employees={employees}/>}/>
          <Route path={"/employee/add"} element={<AddEmployee onAdd={postNewEmployee}/>}/>
          <Route path={"/employee/:id"} element={<EmployeeDetails employees={employees} deleteEmployee={deleteEmployee}/>}/>
         </Routes>
    </div>
  );
}

export default App;
