import {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import axios from "axios";

export default function useEmployees() {
    const [employees,setEmployees] =useState<Employee[]>([]);

    function loadAllEmployees() {
        axios.get<Employee[]>("/api/employees")
            .then(response => response.data)
            .then(setEmployees)
            .catch(console.error)
    }

    useEffect(() => {
        loadAllEmployees()
    },[])

    return {employees}
}