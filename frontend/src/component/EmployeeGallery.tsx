import {Employee} from "../model/Employee";
import "../styling/EmployeeGallery.css";
import {ChangeEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Layout from "./Layout";
import useAuth from "../hooks/useAuth";
import '../styling/Pagination.css'
import moment from "moment";

type Props = {
    employees: Employee[]
}
export default function EmployeeGallery(props: Props) {
    const {isAdmin} = useAuth(false)
    const user = useAuth(true)

    const [filter, setFilter] = useState("")
    const [sortedByFirstName, setSortedByFirstName] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);

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
        setCurrentPage(1);
    }

    function sortEmployeesByName() {
        return [...props.employees].sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
        );
    }
    const sortedList = sortedByFirstName ? sortEmployeesByName() : filteredList;

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = sortedList.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedList.length / employeesPerPage); i++) {
        pageNumbers.push(i);
    }
    const lastPage = Math.ceil(sortedList.length / employeesPerPage);
    const nextPage = () => {
        if (currentPage < lastPage) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return !user ? null: (
        <Layout>
            <section className={"employee-gallery"}>
                <div>
                    {isAdmin && (
                        <button className={"button-add"} onClick={handleClick}>Add a new Employee</button>
                    )}
                </div>
                <div>
                    <p>Number of Employees: {props.employees.length}</p>
                    <input type={"text"} onChange={handleFilterChange} placeholder={"Search"}/>
                    <button onClick={() => setSortedByFirstName(!sortedByFirstName)}>Sort</button>
                </div>
                {currentEmployees.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Department</th>
                            <th className={"position"}>Position</th>
                            <th className={"added"}>Entry date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.department}</td>
                                <td className={"position"}>{employee.position}</td>
                                <td className={"td-added"}>{moment(employee.added).format("DD-MM-YYYY")}</td>
                                <td className={"link"}>
                                    <Link to={"/employee/"+ employee.id}
                                       >
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    "No employees yet"
                )}
                <div className="pagination">
                            <Link to="#" onClick={prevPage}>&laquo;</Link>
                            {pageNumbers.map((number) => (
                                <Link key={number} to="#" onClick={() => paginate(number)}
                                      className={currentPage === number ? "active" : ""}
                                >
                                    {number}
                                </Link>
                            ))}
                            <Link to='#' onClick={nextPage}>&raquo;</Link>
                        </div>
            </section>
        </Layout>
    )
}