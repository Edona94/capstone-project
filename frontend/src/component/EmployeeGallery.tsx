import {Employee} from "../model/Employee";
import EmployeeCard from "./EmployeeCard";
import "../styling/EmployeeGallery.css";
import {ChangeEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Layout from "./Layout";
import useAuth from "../hooks/useAuth";
import '../styling/Pagination.css'
import GenderChart from "../chart/GenderChart";


type Props = {
    employees: Employee[]
}
export default function EmployeeGallery(props: Props) {
    const {isAdmin} = useAuth(false)
    const user = useAuth(true)

    const [filter, setFilter] = useState("")
    const [sortedByFirstName, setSortedByFirstName] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(5);

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

    const employeeCards = currentEmployees.map((employee) => {
        return <EmployeeCard key={employee.id} employee={employee} />;
    });

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
            <aside className={"chart"}>
                <GenderChart employees={props.employees}/>
            </aside>
            <section className={"employee-gallery"}>
                <div>
                    <input type={"text"} onChange={handleFilterChange} placeholder={"Search"}/>
                </div>
                <div>
                    {isAdmin && (
                        <button onClick={handleClick}>Add a new Employee</button>
                    )}
                    <button onClick={() => setSortedByFirstName(!sortedByFirstName)}>Sort by First Name</button>
                    <p>Number of Employees: {props.employees.length}</p>
                </div>
                {employeeCards.length > 0 ? (
                    <>
                        {employeeCards}
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
                    </>
                ) : (
                    "No employees yet"
                )}
            </section>
        </Layout>
    )
}