

export interface Guest {
    email: string;
    adults: number;
    children: number;
    non_vegetarian: number;
    vegetarian: number;
    transport: string;
    day1: string;
    day2: string;
    day3: string;
    day4: string;
    day5: string;
    // attendence_day1: boolean;
    // attendence_day2: boolean;
    // attendence_day3: boolean;
    // attendence_day4: boolean;
    // attendence_day5: boolean;
    guestName: string;
    isPresent: boolean;
    isStudent: boolean;
    message: string;
    paid: boolean;
    total: number;
}


export type GuestTableRow = {
    id: string;
    email: string;
    adults: number;
    children: number;
    non_vegetarian: number;
    vegetarian: number;
    transport: string;
    day1: string;
    day2: string;
    day3: string;
    day4: string;
    day5: string;
    guestName: string;
    isPresent: boolean;
    isStudent: boolean;
    message: string;
    paid: boolean;
    total: number;
}


export type TicketType = "None" | "Full" | "Afternoon" | "Evening" | "Visitor"

//https://github.com/IsaacThaJunior/react-hook-form-and-mui/blob/main/src/form-components/FormInputRadio.tsx