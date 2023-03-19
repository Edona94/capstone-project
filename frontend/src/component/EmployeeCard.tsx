import {Employee} from "../model/Employee";

type Props = {
    employee:Employee
}
export default function EmployeeCard(props:Props) {
    return(
        <div className={"employee-card"}>
            <p>{props.employee.firstName}</p>
            <p>{props.employee.lastName}</p>
            <p>{props.employee.id}</p>
        </div>
    )
}