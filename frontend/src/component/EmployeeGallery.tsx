import {Employee} from "../model/Employee";
import EmployeeCard from "./EmployeeCard";
import "../styling/EmployeeGallery.css";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    employees: Employee[]
}
export default function EmployeeGallery(props: Props) {

    const [filter, setFilter] = useState("")
    const [sortedByFirstName, setSortedByFirstName] = useState(false);
    const navigate = useNavigate();
    function handleClick() {
        navigate("/employee/add")
    }

    const filteredList = props.employees.filter((employee) =>
        employee
            .firstName
            .toLowerCase()
            .includes(filter.toLowerCase())
        ||
        employee
            .lastName
            .toLowerCase()
            .includes(filter.toLowerCase())
    );

    function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
        setFilter(event.target.value)
    }

    function sortEmployeesByName() {
        return [...props.employees].sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
        );
    }

    const employeeCards = (sortedByFirstName ? sortEmployeesByName() : filteredList).map((employee) => {
        return <EmployeeCard key={employee.id} employee={employee} />;
    });
    return (
        <>
            <section className={"employee-gallery"}>
                <div>
                    <input type={"text"} onChange={handleFilterChange} placeholder={"Search"}/>
                </div>
                <div>
                <button onClick={handleClick}>Add a new Employee</button>
                    <button onClick={() => setSortedByFirstName(!sortedByFirstName)}>Sort by First Name</button>
                    <p>Number of Employees: {props.employees.length}</p>
                </div>
                {employeeCards.length > 0 ? employeeCards : "No employees yet"}
            </section>
        </>
    )
}