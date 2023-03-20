import React from 'react';
import './App.css';
import useEmployees from "./hooks/useEmployees";
import {Route, Routes} from "react-router-dom";
import EmployeeGallery from "./component/EmployeeGallery";

function App() {
  const {employees} = useEmployees()
  return (
    <div className="App">
      <Routes>
        <Route path={"/employees"} element={<EmployeeGallery employees={employees}/>}/>
      </Routes>
    </div>
  );
}

export default App;
