import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";

type Props = {
    employees: Employee[]
    onEdit: (employee: Employee, file?: File) => void
}

export default function EditEmployee(props: Props) {
    const params = useParams()
    const employeeId: string | undefined = params.id;
    const [employee, setEmployee] = useState<Employee | undefined>();

    useEffect(() => {
        const filteredEmployee = props.employees.find(employee => employee.id === employeeId);
        if (filteredEmployee) {
            setEmployee(filteredEmployee);
        } else {
            axios.get("/api/employees/" + employeeId)
                .then(r => r.data)
                .then(setEmployee)
                .catch(console.error)
        }
    }, [employeeId, props.employees]);

    if (!employee) {
        return (
            <h2>Sorry, no employee with id {employeeId} found!</h2>
        )
    }
    return (
        <>
            <EmployeeForm employee={employee}
                          onSubmit={props.onEdit}
                          action={"update"}
                          navigateTo={"/employee/" + employeeId}/>
        </>
    )
}