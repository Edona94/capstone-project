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
    function handleEditButton(){
        navigate("/employee/edit/"+employee?.id)
    }

    return (
        <>
            <div>
                <button className={"back"} onClick={handleBackButton}>Back</button>
            </div>
            <section className={"employee-details"}>
                <h2>Employee details</h2>
                <ul>
                    <a href={employee.cv} >CV</a>
                    <p><strong>ID:</strong> {employee.id}</p>
                    <p><strong>First name:</strong> {employee.firstName}</p>
                    <p><strong>Last name:</strong> {employee.lastName}</p>
                    <p><strong>Position:</strong> {employee.position}</p>
                    <p><strong>Date of birth:</strong> {employee.dateOfBirth}</p>
                    <p><strong>Address:</strong> {employee.address.street}.{employee.address.houseNumber}, {employee.address.postalCode} {employee.address.city}</p>
                    <p><strong>E-Mail:</strong> {employee.email}</p>
                    <p><strong>Phone number:</strong> {employee.phoneNumber}</p>
                    <p><strong>Added:</strong> {moment(employee.added).format("YYYY-MM-DD HH:mm")}</p>
                </ul>
                <menu>
                    <li><button onClick={handleEditButton}>Edit</button></li>
                    <li><button className={"delete"} onClick={handleDeleteButton}>Delete</button></li>
                </menu>
            </section>
        </>
    );
}