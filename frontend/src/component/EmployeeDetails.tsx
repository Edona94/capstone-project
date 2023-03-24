import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import "../styling/EmployeeDetails.css"
import moment from "moment";

type Props = {
    employees: Employee[]
}

export default function EmployeeDetails(props: Props) {
    const params = useParams()
    const id = params.id
    const [employee, setEmployee] = useState<Employee | undefined>()
    const navigate = useNavigate()

    useEffect(() => {
        const filteredEmployee = props.employees.find(employee => employee.id === id);
        if (filteredEmployee) {
            setEmployee(filteredEmployee);
        }
    }, [id, props.employees]);

    if (!employee) {
        return (
            <h2>Sorry, no employee with id {id} found!</h2>
        )
    }
    function handleBackButton() {
        navigate("/")
    }

    return (
        <>
            <div>
                <button className={"back"} onClick={handleBackButton}>Back</button>
            </div>
            <section className={"employee-details"}>
                <h2>Employee details</h2>
                <ul>
                    <a href={employee.cv}>CV</a>
                    <p>ID: {employee.id}</p>
                    <p>First name: {employee.firstName}</p>
                    <p>Last name: {employee.lastName}</p>
                    <p>Position: {employee.position}</p>
                    <p>Date of birth: {employee.dateOfBirth}</p>
                    <p>Address: {employee.address.street}.{employee.address.houseNumber}, {employee.address.postalCode} {employee.address.city}</p>
                    <p>E-Mail: {employee.email}</p>
                    <p>Phone number: {employee.phoneNumber}</p>
                    <p>Added: {moment(employee.added).format("YYYY-MM-DD HH:mm")}</p>
                </ul>
            </section>
        </>
    );
}