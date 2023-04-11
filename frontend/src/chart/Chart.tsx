import Layout from "../component/Layout";
import GenderChart from "./GenderChart";
import WomenChart from "./WomenChart";
import DepartmentChart from "./DepartmentChart";
import {Employee} from "../model/Employee";
import useAuth from "../hooks/useAuth";
import EmployeeBarChart from "./Dep_genderChart";

type Props = {
    employees: Employee[]
}
export default function Chart(props:Props) {
    const user = useAuth(true)

return !user ? null: (
    <Layout>
        <div className={"chart"}>
            <GenderChart employees={props.employees}/>
        </div>
        <div className={"department-chart"}>
            <WomenChart employees={props.employees}/>
        </div>
        <div className={"department-chart"}>
            <DepartmentChart employees={props.employees}/>
        </div>
        <div className={"department-chart"}>
            <EmployeeBarChart employees={props.employees}/>
        </div>
    </Layout>
)
}