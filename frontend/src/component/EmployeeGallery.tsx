import {Employee} from "../model/Employee";
import EmployeeCard from "./EmployeeCard";
import "../styling/EmployeeGallery.css";

type Props = {
    employees: Employee[]
}
export default function EmployeeGallery(props: Props) {
    const employeeCard = props.employees.map((employee) => {
            return <EmployeeCard key={employee.id} employee={employee}/>
        }
    )
    return (
        <section className={"employee-gallery"}>
            {employeeCard.length>0 ? employeeCard : "No employees yet"}
        </section>
    )
}