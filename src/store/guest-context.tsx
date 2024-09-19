import { createContext, ReactNode, useReducer } from "react";
import { Guest, GuestTableRow } from "../types";
import { GuestAction } from "./guest";


export const GuestContext = createContext<{
    guests: GuestTableRow[];
    dispatch: React.Dispatch<GuestAction>;
    addGuest: (guest: Guest) => void,
    setGuests: (guests: GuestTableRow[]) => void,
    deleteGuest: (id: string) => void,
    updateGuest: (id: string, guest: Guest) => void,
} | null>(null);




const guestsReducer = (state: GuestTableRow[], action: GuestAction): GuestTableRow[] => {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.email === action.payload.guest.email
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.guest };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.email !== action.payload);
        default:
            return state;
    }
}


const GuestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [guests, dispatch] = useReducer(guestsReducer, []);


    function addGuest(guest: Guest): void {
        dispatch({ type: 'ADD', payload: guest });
    }

    function setGuests(guests: GuestTableRow[]): void {
        dispatch({ type: 'SET', payload: guests });
    }

    function deleteGuest(id: string): void {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateGuest(id: string, guest: Guest): void {
        dispatch({ type: 'UPDATE', payload: { id: id, guest: guest } });
    }


    return (
        <GuestContext.Provider value={{
            guests, dispatch,
            addGuest, setGuests,
            deleteGuest,
            updateGuest,
        }
        }>
            {children}
        </GuestContext.Provider>
    );
};



export default GuestProvider;
