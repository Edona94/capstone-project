import {Employee, Address} from "../model/Employee";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styling/EmployeeCard.css"
import moment from "moment";


type Props = {
    onAdd: (employee: Employee,file:File) => void
}

export default function AddEmployee(props: Props) {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [dateOfBirth, setDateOfBirth] = useState<string>("")
    const [address, setAddress] = useState<Address>({street: "", houseNumber: "", postalCode: "", city: ""})
    const [email, setEmail] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [added, setAdded] = useState<Date>(new Date())
    const [file, setFile] = React.useState<File | null>(null);

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
        if (!file) {
            return;
        }
        payload.set('file', file);
        const newEmployee: Employee = {
            firstName,
            lastName,
            position,
            dateOfBirth,
            address,
            email,
            phoneNumber,
            added
        }
        if(file && newEmployee) {
            props.onAdd(newEmployee, file)
            navigate("/employees")
        }
    }

    return (
        <>
            <h3>Add a new Employee </h3>
            <form onSubmit={formSubmitHandler} className={"add-employee"}>
                <div>
                    <label htmlFor="firstname">First Name:</label>

                    <input type={"text"} id="firstName" name="firstname" onChange={handleFirstNameChange} value={firstName} placeholder={"firstname"}
                           required={true}/>
                </div>
                <div>
                    <label htmlFor={lastName}> Last Name: </label>
                        <input type={"text"} id="lastname" name="lastname" onChange={handleLastNameChange} value={lastName} placeholder={"lastname"}
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
                    <input type={"text"} onChange={handleAddress_CityChange} value={address.city} placeholder={"city"}
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
                    Upload CV:
                    <input type={'file'} onChange={handleFileChange} accept={"application/pdf"} />
                </label>
                <div>
                    <button type={"submit"}>Save</button>
                </div>
            </form>
        </>
    );
}