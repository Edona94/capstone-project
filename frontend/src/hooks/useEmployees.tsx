import {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import axios from "axios";
import moment from "moment";


export default function useEmployees() {

    const [employees,setEmployees] =useState<Employee[]>([]);

    function loadAllEmployees() {
        axios.get<Employee[]>("/api/employees")
            .then(response => response.data)
            .then(setEmployees)
            .catch(console.error)
    }

    function postNewEmployee(newEmployee: Employee, file: File) {
        const payload = new FormData();
        if (!file) {
            return;
        }
        payload.append('file', file);
        payload.append("employeeDTORequest",new Blob([JSON.stringify({...newEmployee, added :moment(newEmployee.added)})],{type:"application/json"}));
        return axios.post("/api/employees" ,payload)
            .then(response => response.data)
            .then(data => setEmployees(prevState => [...prevState,data]))
            .catch(console.error)
    }

    useEffect(() => {
        loadAllEmployees()
    },[])

    return {employees,postNewEmployee}
}