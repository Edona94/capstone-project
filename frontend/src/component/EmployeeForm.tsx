import React, {ChangeEvent, FormEvent, useState} from "react";
import {Employee, Address} from "../model/Employee";
import {useNavigate} from "react-router-dom";
import "../styling/AddEmployee.css"
import moment from "moment";
import {Gender} from "../model/Gender";


type Props = {
    employee: Employee
    onSubmit: (employee: Employee, file?: File) => void
    action: "add" | "update"
    navigateTo: string | undefined
}

export default function EmployeeForm(props: Props) {

    const [firstName, setFirstName] = useState<string>(props.employee.firstName)
    const [lastName, setLastName] = useState<string>(props.employee.lastName)
    const [position, setPosition] = useState<string>(props.employee.position)
    const [dateOfBirth, setDateOfBirth] = useState<string>(props.employee.dateOfBirth)
    const [address, setAddress] = useState<Address>({
        street: props.employee.address.street,
        houseNumber: props.employee.address.houseNumber,
        postalCode: props.employee.address.postalCode,
        city: props.employee.address.city
    })
    const [email, setEmail] = useState<string>(props.employee.email)
    const [phoneNumber, setPhoneNumber] = useState<string>(props.employee.phoneNumber)
    const [added, setAdded] = useState<Date>(props.employee.added)
    const [file, setFile] = React.useState<File | undefined>(undefined);
    const [gender, setGender] = useState(props.employee.gender)
    const [department, setDepartment] = useState(props.employee.department)
    const [salary, setSalary] = useState<string>(props.employee.salary)

    const navigate = useNavigate()

    function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
    }

    function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
    }

    function handlePositionChange(event: ChangeEvent<HTMLInputElement>) {
        setPosition(event.target.value)
    }

    function handleDateOfBirthChange(event: ChangeEvent<HTMLInputElement>) {
        setDateOfBirth(event.target.value)
    }

    function handleAddress_StreetChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setAddress({
                ...address,
                street: event.target.value,
            }
        )
    }

    function handleAddress_HouseNumberChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setAddress({
                ...address,
                houseNumber: event.target.value,
            }
        )
    }

    function handleAddress_PostalCodeChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setAddress({
                ...address,
                postalCode: event.target.value,
            }
        )
    }

    function handleAddress_CityChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setAddress({
                ...address,
                city: event.target.value,
            }
        )
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function handlePhoneNumberChange(event: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(event.target.value)
    }

    function handleAddedChange(event: ChangeEvent<HTMLInputElement>) {
        const date = new Date(event.target.value)
        setAdded(date)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    }
    const genderOptions = new Map([
        [Gender.MALE, "Male"],
        [Gender.FEMALE, "Female"],
        [Gender.OTHER, "Other"]
    ]);

    function handleGenderChange(event: ChangeEvent<HTMLInputElement>) {
        setGender(event.target.value as Gender);
    }

    function handleDepartmentChange(event: ChangeEvent<HTMLSelectElement>) {
        setDepartment(event.target.value)
    }
    function handleSalaryChange(event: ChangeEvent<HTMLInputElement>) {
        setSalary(event.target.value);
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const payload = new FormData();
        payload.set('file', file ? file : "");
        const editEmployee: Employee = {
            firstName,
            lastName,
            position,
            dateOfBirth,
            address,
            email,
            phoneNumber,
            added,
            gender,
            department,
            salary
        }
        if (props.employee.id) {
            editEmployee.id = props.employee.id
        }

        if (file) {
            props.onSubmit(editEmployee, file)
            if (props.navigateTo) {
                navigate(props.navigateTo)
            }
        } else {
            props.onSubmit(editEmployee)
            if (props.navigateTo) {
                navigate(props.navigateTo)
            }
        }
    }

    function handleCancelButton() {
        if (props.navigateTo) {
            navigate(props.navigateTo)
        }
    }

    return (
        <>
            <form onSubmit={formSubmitHandler} className={"add-employee"}>
                <div className={"user-details"}>
                    <div className={"input-box"}>
                        <span className={"details"}>First Name:</span>
                        <input type={"text"} id="firstName" name="firstname" onChange={handleFirstNameChange}
                               value={firstName} placeholder={"firstname"}
                               required={true}/>
                    </div>
                    <div className={"input-box"}>
                        <span className={"details"}> Last Name: </span>
                        <input type={"text"} id="lastname" name="lastname" onChange={handleLastNameChange}
                               value={lastName}
                               placeholder={"lastname"}
                               required={true}/>
                    </div>
                </div>
                <div className={"user-details"}>
                    <div className={"input-box"}>
                        <span className={"details"}>Department:</span>
                        <select  className={"select-option"} name={"department"} value={department} required={true}
                                onChange={handleDepartmentChange}>
                            <option value="" disabled>Choose a department</option>
                            <option value={"Engineering"}>Engineering</option>
                            <option value={"Software Development"}>Software Development</option>
                            <option value={"IT"}>IT</option>
                            <option value={"Finance"}>Finance</option>
                            <option value={"Human Resources"}>Human Resources</option>
                            <option value={"Sales"}>Sales</option>
                        </select>
                    </div>
                    <div className={"input-box"}>
                        <span className={"details"}>Position:</span>
                        <input type={"text"} onChange={handlePositionChange} value={position} placeholder={"position"}
                               required={true}/>
                    </div>
                </div>
                <div className={"user-details"}>
                    <div className={"input-box"}>
                        <span className={"details"}>Salary:</span>
                        <input type={"text"}  onChange={handleSalaryChange} value={salary} placeholder={"salary"}
                               required={true}/>
                    </div>
                    <div className={"input-box"}>
                        <span className={"details"}>Date of birth: </span>
                        <input type={"date"} onChange={handleDateOfBirthChange} value={dateOfBirth}
                               placeholder={"date of birth"} required={true}/>
                    </div>
                </div>
                <div className={"gender-details"}>
                    <div className={"category"}>
                        <label htmlFor="gender">Gender:</label>
                        {Array.from(genderOptions, ([value, label]) => (
                            <div key={value}>
                                <input className={"dot-1"}
                                       type="radio"
                                       id={value}
                                       name="gender"
                                       value={value}
                                       onChange={handleGenderChange}
                                       checked={gender === value}
                                       required
                                />
                                <label htmlFor={label}>{label}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={"user-details"}>
                    <div className={"input-box-address"}>
                        <span className={"details"}>Street:</span>
                        <input type={"text"} onChange={handleAddress_StreetChange} value={address.street}
                               placeholder={"street"} required={true}/>
                    </div>
                    <div className={"input-box-address"}>
                        <span className={"details"}>House number:</span>
                        <input type={"text"} onChange={handleAddress_HouseNumberChange} value={address.houseNumber}
                               placeholder={"house number"} required={true}/>
                    </div>
                    <div className={"input-box-address"}>
                        <span className={"details"}>Postal code:</span>
                        <input type={"text"} onChange={handleAddress_PostalCodeChange} value={address.postalCode}
                               placeholder={"postal code"} required={true}/>
                    </div>
                    <div className={"input-box-address"}>
                        <span className={"details"}>City:</span>
                        <input type={"text"} onChange={handleAddress_CityChange} value={address.city}
                               placeholder={"city"}
                               required={true}/>
                    </div>

                </div>
                <div className={"user-details"}>
                    <div className={"input-box"}>
                        <span className={"details"}>E-Mail:</span>
                        <input type={"email"} onChange={handleEmailChange} value={email} placeholder={"e-mail"}
                               required={true}/>
                    </div>
                    <div className={"input-box"}>
                        <span className={"details"}>Phone number: </span>
                        <input type={"text"} onChange={handlePhoneNumberChange} value={phoneNumber}
                               placeholder={"phone number"} required={true}/>
                    </div>
                </div>
                <div className={"user-details"}>
                    <div className={"input-box"}>
                        <span className={"details"}>Upload CV:</span>
                        <input type={'file'} onChange={handleFileChange} accept={"application/pdf"} required={false}/>
                    </div>
                    <div className={"input-box"}>
                        <span className={"details"}>Entry date:</span>
                        <input type={"datetime-local"} onChange={handleAddedChange}
                               value={moment(added).format("YYYY-MM-DD HH:mm")} placeholder={"entry date"}
                               required={true}/>
                    </div>
                </div>
                <menu>
                    <li>
                        <button type={"submit"}>
                            {props.action === "add" && "Save"}
                            {props.action === "update" && "Save changes"}
                        </button>
                    </li>
                    <li>
                        <button className={"cancel"} onClick={handleCancelButton}>Cancel</button>
                    </li>
                </menu>
            </form>
        </>
    )
        ;
}