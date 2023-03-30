import React from "react";
import "../styling/AddEmployee.css"
import EmployeeForm from "./EmployeeForm";
import {Employee} from "../model/Employee";
import Layout from "./Layout";
import useAuth from "../hooks/useAuth";


type Props = {
    onAdd: (employee: Employee, file?: File) => void
}

export default function AddEmployee(props: Props) {

    const {isAdmin} = useAuth(false)

        return !isAdmin ? null:(
            <Layout>
                <h2 className={"add-employee-h2"}>Add a new employee</h2>
                <EmployeeForm employee={{
                    firstName: "", lastName: "", position: "", dateOfBirth: "",
                    address: {street: "", houseNumber: "", postalCode: "", city: ""},
                    email: "", phoneNumber: "", added: new Date()
                }}
                              onSubmit={props.onAdd}
                              action={"add"}
                              navigateTo={"/"}/>
            </Layout>
        );
}