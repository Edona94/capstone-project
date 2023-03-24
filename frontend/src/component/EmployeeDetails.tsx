import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import "../styling/EmployeeDetails.css"
import moment from "moment";

type Props = {
    employees: Employee[]
    deleteEmployee: (id: string) => Promise<void>
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
    function handleDeleteButton() {
        props.deleteEmployee(id || "undefined")
            .then(() => navigate("/"))
            .catch(console.error)
    }

    return (
        <>
            <div>
                <button className={"back"} onClick={handleBackButton}>Back</button>
            </div>
            <section className={"employee-details"}>
                <h2>Employee details</h2>
                <ul>
                    <a href={employee.cv} target={"_blank"}>CV</a>
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
                <div>
                    <button className={"delete"} onClick={handleDeleteButton}>Delete</button>
                </div>
            </section>
        </>
    );
}