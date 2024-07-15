export type ServiceRecord = {
	stationnum: string;
	empnum: string;
	gsis: string;
}

export type EmployeeInfo ={
    lastName: string;
    firstName: string;
    middleName:string;
    birthdate: Date;
    placeOfBirth: string;
}


export type Service ={

}

export type VerifiedBy = {
    HRMOII:string;
    admin:string;
}

export type RecordAppointment = {
    position: string;
    status: string;
    salary: number;
}

export type Office ={
    organization: string;
}

export type SourceOfFund ={
    funds: string;
}

export type Remarks ={
    remarks: string;
}

// create types for values needed in service record