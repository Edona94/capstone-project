import {Employee} from "../model/Employee";
import "../styling/EmployeeCard.css";
import moment from "moment";
import {useNavigate} from "react-router-dom";

type EmployeeCardProps = {
    employee:Employee
}
export default function EmployeeCard(props:EmployeeCardProps) {
    const navigate= useNavigate()
    function handleDetailsButton() {
        navigate("/employee/"+props.employee.id)
    }

    return(
        <>
        <div className={"employee-card"}>
            <div>
                <button onClick={handleDetailsButton}>Details</button>
                <p>{props.employee.firstName} {props.employee.lastName}</p>
                Added: {moment(props.employee.added).format("YYYY-MM-DD HH:mm")}
            </div>
        </div>
        </>
    )
}