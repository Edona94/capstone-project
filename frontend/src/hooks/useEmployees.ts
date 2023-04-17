import {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import axios from "axios";
import moment from "moment";


export default function useEmployees() {

    const [employees,setEmployees] = useState<Employee[]>([]);

    function loadAllEmployees() {
        axios.get<Employee[]>("/api/employees")
            .then(response => response.data)
            .then(setEmployees)
            .catch(console.error)
    }

    function postNewEmployee(newEmployee: Employee, file?: File) {
        const payload = new FormData();
        payload.set('file', file ? file : "");
        payload.append("employeeDTORequest", new Blob([JSON.stringify({
            ...newEmployee,
            added: moment(newEmployee.added)
        })], {type: "application/json"}));
        return axios.post("/api/employees", payload)
            .then(response => response.data)
            .then(data => {setEmployees(prevState => [...prevState,data])
            loadAllEmployees()})
            .catch(console.error)
    }

    function updateEmployee(employee: Employee, file?: File) {
        const payload = new FormData();
        payload.set('file', file ? file : "");
        payload.append("employeeDTORequest", new Blob([JSON.stringify({
            ...employee,
            added: moment(employee.added)
        })], {type: "application/json"}));
        return axios.put("/api/employees/" + employee.id, payload)
            .then(response => response.data)
            .then(data => setEmployees(prevState => {
                    return prevState.map(currentEmployee => {
                        if (currentEmployee.id === employee.id) {
                            return data
                        }
                        return currentEmployee
                    })
                }
            ))
            .catch(console.error)
    }

    function deleteEmployee(id:string) {
        return axios.delete("/api/employees/" +id)
            .then(() => {
            loadAllEmployees()
            })
            .catch(console.error)
    }

    useEffect(() => {
        loadAllEmployees()
    },[])

    return {employees, postNewEmployee, updateEmployee, deleteEmployee}
}