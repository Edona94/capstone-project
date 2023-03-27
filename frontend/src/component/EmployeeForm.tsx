import React, {ChangeEvent, FormEvent, useState} from "react";
import {Employee, Address} from "../model/Employee";
import {useNavigate} from "react-router-dom";
import "../styling/AddEmployee.css"
import moment from "moment";


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
                <div>
                    <label htmlFor="firstname">First Name:</label>

                    <input type={"text"} id="firstName" name="firstname" onChange={handleFirstNameChange}
                           value={firstName} placeholder={"firstname"}
                           required={true}/>
                </div>
                <div>
                    <label htmlFor={lastName}> Last Name: </label>
                    <input type={"text"} id="lastname" name="lastname" onChange={handleLastNameChange} value={lastName}
                           placeholder={"lastname"}
                           required={true}/>
                </div>
                <div>
                    <label>Position:</label>
                    <input type={"text"} onChange={handlePositionChange} value={position} placeholder={"position"}
                           required={true}/>
                </div>
                <div>
                    <label>Date of birth: </label>
                    <input type={"date"} onChange={handleDateOfBirthChange} value={dateOfBirth}
                           placeholder={"date of birth"} required={true}/>
                </div>
                <div>
                    <label>
                        Address:
                        <input type={"text"} onChange={handleAddress_StreetChange} value={address.street}
                               placeholder={"street"} required={true}/>
                        <input type={"text"} onChange={handleAddress_HouseNumberChange} value={address.houseNumber}
                               placeholder={"house number"} required={true}/>
                        <input type={"text"} onChange={handleAddress_PostalCodeChange} value={address.postalCode}
                               placeholder={"postal code"} required={true}/>
                        <input type={"text"} onChange={handleAddress_CityChange} value={address.city}
                               placeholder={"city"}
                               required={true}/>
                    </label>
                </div>
                <label>
                    E-Mail:
                    <input type={"text"} onChange={handleEmailChange} value={email} placeholder={"e-mail"}
                           required={true}/>
                </label>
                <label>
                    Phone number:
                    <input type={"text"} onChange={handlePhoneNumberChange} value={phoneNumber}
                           placeholder={"phone number"} required={true}/>
                </label>
                <label>
                    Added:
                    <input type={"datetime-local"} onChange={handleAddedChange}
                           value={moment(added).format("YYYY-MM-DD HH:mm")} placeholder={"added"} required={true}/>
                </label>
                <label>
                    <a href={props.employee.cv}>CV</a>
                </label>
                <label>
                    Upload CV:
                    <input type={'file'} onChange={handleFileChange} accept={"application/pdf"} required={false}/>
                </label>
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
    );
}