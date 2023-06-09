import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Employee} from "../model/Employee";
import "../styling/EmployeeDetails.css"
import moment from "moment";
import Layout from "./Layout";
import useAuth from "../hooks/useAuth";
import Modal from "react-modal";
import '../styling/Modal.css'
import {toast} from "react-hot-toast";


type Props = {
    employees: Employee[]
    deleteEmployee: (id: string) => Promise<void>
}

Modal.setAppElement('#root')

export default function EmployeeDetails(props: Props) {
    const {isAdmin} = useAuth(false)
    const params = useParams()
    const id = params.id
    const [employee, setEmployee] = useState<Employee | undefined>()
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const filteredEmployee = props.employees.find(employee => employee.id === id);
        if (filteredEmployee) {
            setEmployee(filteredEmployee);
        }
    }, [id, props.employees]);

    if (!employee) {
        return (
            <h2>Sorry, no employee with id {id} found!</h2>
        )
    }

    function handleBackButton() {
        navigate("/")
    }

    function handleDeleteButton() {
        setShowModal(true);
    }

    function confirmDelete() {
        setShowModal(false);
        props
            .deleteEmployee(id || "undefined")
            .then(() => {
                navigate("/");
             toast.success('Successfully deleted');
    })
            .catch(err => {
                console.error(err);
                toast.error('Error: ' + (err.response.data.error || err.response.data.message));
            });
    }

    function cancelDelete() {
        setShowModal(false);
    }

    function handleEditButton() {
        navigate("/employee/edit/" + employee?.id)
    }

    return (
        <Layout>
            <div>
                <button className={"back"} onClick={handleBackButton}>Back</button>
            </div>
            <section className={"employee-details"}>
                <h3>Employee <span>details</span></h3>
                {isAdmin ? <a href={employee.cv}>CV</a> : null}
                <div className="employee-details__section">
                    <div className="employee-details__label">ID:</div>
                    <div className="employee-details__value">{employee.id}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Name:</div>
                    <div className="employee-details__value">{employee.firstName} {employee.lastName}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Department:</div>
                    <div className="employee-details__value">{employee.department}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Position:</div>
                    <div className="employee-details__value">{employee.position}</div>
                </div>
                {isAdmin ?
                <div className="employee-details__section">
                    <div className="employee-details__label">Salary:</div>
                    <div className="employee-details__value">{employee.salary}€</div>
                </div>
                    :
                    null
                }
                <div className="employee-details__section">
                    <div className="employee-details__label">Date of birth:</div>
                    <div className="employee-details__value">{employee.dateOfBirth}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Gender:</div>
                    <div className="employee-details__value">{employee.gender}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Address:</div>
                    <div
                        className="employee-details__value">{employee.address.street} {employee.address.houseNumber}, {employee.address.postalCode} {employee.address.city}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Email:</div>
                    <div className="employee-details__value">{employee.email}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Phone number:</div>
                    <div className="employee-details__value">{employee.phoneNumber}</div>
                </div>
                <div className="employee-details__section">
                    <div className="employee-details__label">Entry date:</div>
                    <div className="employee-details__value">{moment(employee.added).format("YYYY-MM-DD")}</div>
                </div>


                {isAdmin ?
                    <menu>
                        <li>
                            <button onClick={handleEditButton}>Edit</button>
                        </li>
                        <li>
                            <button className={"delete"} onClick={handleDeleteButton}>Delete</button>
                        </li>
                    </menu>
                    :
                    null
                }
                <Modal
                    isOpen={showModal}
                    onRequestClose={cancelDelete}
                    contentLabel="Confirm Delete"
                    style={{
                        overlay: {
                            zIndex: 9999,
                            backgroundColor: 'rgba(0, 0, 0,0.5)',
                            }
                        }}
                >
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to delete this employee:<br/>
                        <span>{employee.firstName} {employee.lastName}?</span></p>
                    <button onClick={cancelDelete}>Cancel</button>
                    <button className={"yes"} onClick={confirmDelete}>Delete</button>
                </Modal>
            </section>
        </Layout>
    );
}