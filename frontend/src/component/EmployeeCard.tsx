import {Employee} from "../model/Employee";

type EmployeeCardProps = {
    employee:Employee
}
export default function EmployeeCard(props:EmployeeCardProps) {
    return(
        <div className={"employee-card"}>
            <p>{props.employee.firstName}</p>
            <p>{props.employee.lastName}</p>
            <p>{props.employee.id}</p>
        </div>
    )
}