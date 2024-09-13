// export type Guest = {
//     guestName: string;
//     isPresent: boolean;
//     adults: number;
//     children: number;
//     isStudent: boolean;
//     isVeg: boolean;
//     isCar: boolean;
//     total: number;
//     paid: boolean;
//     day1: number;
//     day2: number;
//     day3: number;
//     day4: number;
//     day5: number;
//     all5days: boolean;
//     message: string;
// };

export interface Guest {
    email: string;
    adults: number;
    children: number;
    non_vegetarian: number;
    vegetarian: number;
    day1: number;
    day2: number;
    day3: number | null;
    day4: number | null;
    day5: number | null;
    guestName: string;
    isPresent: boolean;
    isStudent: boolean;
    message: string;
    paid: boolean;
    total: number;
}



export type TicketType = "None" | "Full" | "Afternoon" | "Evening" | "Visitor"

//https://github.com/IsaacThaJunior/react-hook-form-and-mui/blob/main/src/form-components/FormInputRadio.tsx