import { Button, Paper, Typography } from "@mui/material"
import { onValue, ref } from "firebase/database"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { db } from "../firebase/firebase"
import { Guest } from "../types"



const GuestDetails = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [guest, setGuest] = useState<Guest>()

    useEffect(() => {
        const refId = location.state.guestId
        onValue(ref(db, "/guests/" + refId), (snapshot) => {
            if (snapshot) {
                setGuest(snapshot.val())
            }
        }, {
            onlyOnce: true
        });


    }, [location])

    if (!guest) {
        return <Typography variant="h3">Guest not found</Typography>
    }

    return <Paper
        style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "5px",
        }}
    >
        <Typography>Name: {guest.guestName}</Typography>
        <Typography>Is Student: {guest.isStudent.toString()}</Typography>
        <Typography>Email: {guest.email}</Typography>
        <Typography>Adults: {guest.adults}</Typography>
        <Typography>Children: {guest.children}</Typography>
        <Typography>Non-Veg: {guest.non_vegetarian}</Typography>
        <Typography>Veg: {guest.vegetarian}</Typography>
        <Typography>Transport: {guest.transport}</Typography>
        <Typography>Sosthi: {guest.day1}</Typography>
        <Typography>Saptami: {guest.day2}</Typography>
        <Typography>Astomi: {guest.day3}</Typography>
        <Typography>Nobomi: {guest.day4}</Typography>
        <Typography>Doshomi: {guest.day5}</Typography>
        <Typography>Paid: {guest.paid.toString()}</Typography>
        <Typography>Total: {guest.total}</Typography>
        <Typography>Message: {guest.message}</Typography>


        <Button onClick={() => navigate('/profile')}>Back</Button>

    </Paper>
}

export default GuestDetails;