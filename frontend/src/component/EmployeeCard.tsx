import {Employee} from "../model/Employee";
import "../styling/EmployeeCard.css";
import moment from "moment";

type EmployeeCardProps = {
    employee:Employee
}
export default function EmployeeCard(props:EmployeeCardProps) {

    return(
        <>
        <div className={"employee-card"}>
            <p>{props.employee.firstName} {props.employee.lastName} </p>
            <p>ID: {props.employee.id}</p>
            Added: {moment(props.employee.added).format("YYYY-MM-DD HH:mm")}
        </div>
        </>
    )
}