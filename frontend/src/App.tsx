import React from 'react';
import './App.css';
import useEmployees from "./hooks/useEmployees";
import {Route, Routes} from "react-router-dom";
import EmployeeGallery from "./component/EmployeeGallery";
import AddEmployee from "./component/AddEmployee";
import EmployeeDetails from "./component/EmployeeDetails";
import EditEmployee from "./component/EditEmployee";
import Footer from "./component/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import SignUpPage from "./component/SignUpPage";
import SignInPage from "./component/SignInPage";
import Chart from "./chart/Chart";
import {Toaster} from "react-hot-toast";
import './styling/Footer.css'

axios.interceptors.request.use(function (config) {
    return fetch("/api/csrf").then(() => {
        config.headers["X-XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
        return config;
    });
}, function (error) {
    return Promise.reject(error);
});

function App() {
  const {employees,postNewEmployee,updateEmployee,deleteEmployee} = useEmployees()
    return (
    <div className="App">
      <Routes>
          <Route path={"/"} element={<EmployeeGallery employees={employees}/>}/>
          <Route path={"/sign-up"} element={<SignUpPage/>}/>
          <Route path={"/sign-in"} element={<SignInPage/>}/>
          <Route path={"/employees"} element={<EmployeeGallery employees={employees}/>}/>
          <Route path={"/employee/add"} element={<AddEmployee onAdd={postNewEmployee}/>}/>
          <Route path={"/employee/:id"} element={<EmployeeDetails employees={employees} deleteEmployee={deleteEmployee}/>}/>
          <Route path={"/employee/edit/:id"} element={<EditEmployee employees={employees} onEdit={updateEmployee}/>}/>
          <Route path={"/chart"} element={<Chart employees={employees}/>}/>
         </Routes>
        <Toaster
            position={"top-right"}
            toastOptions={{duration: 5000}}
        />
        <Footer/>
    </div>
  );
}

export default App;