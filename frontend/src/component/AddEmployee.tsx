import React from "react";
import "../styling/AddEmployee.css"
import EmployeeForm from "./EmployeeForm";
import {Employee} from "../model/Employee";


type Props = {
    onAdd: (employee: Employee, file?: File) => void
}

export default function AddEmployee(props: Props) {
    return (
        <>
            <h2 className={"add-employee-h2"}>ADD Employee </h2>
            <EmployeeForm employee={{
                firstName: "", lastName: "", position: "", dateOfBirth: "",
                address: {street: "", houseNumber: "", postalCode: "", city: ""},
                email: "", phoneNumber: "", added: new Date()
            }}
                          onSubmit={props.onAdd}
                          action={"add"}
                          navigateTo={"/"}/>
        </>
    );
}