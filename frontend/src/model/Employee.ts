export type Address = {
    street: string,
    houseNumber: string,
    postalCode: string,
    city: string
}

export type Employee = {
    id?: string,
    firstName: string,
    lastName: string,
    position: string,
    dateOfBirth: string,
    address: Address,
    email: string,
    phoneNumber: string,
    added: Date,
    cv?:string,
    userId?:string
}