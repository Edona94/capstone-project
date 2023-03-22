import {Employee} from "../model/Employee";
import EmployeeCard from "./EmployeeCard";
import "../styling/EmployeeGallery.css";
import {ChangeEvent, useState} from "react";

type Props = {
    employees: Employee[]
}
export default function EmployeeGallery(props: Props) {

    const [filter, setFilter] = useState("")

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

    const employeeCards = filteredList.map((employee) => {
            return <EmployeeCard key={employee.id} employee={employee}/>
        }
    )
    return (
        <>
            <input type={"text"} onChange={handleFilterChange} placeholder={"Search"}/>
            <section className={"employee-gallery"}>
                {employeeCards.length > 0 ? employeeCards : "No employees yet"}
            </section>
        </>
    )
}