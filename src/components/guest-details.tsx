import { Button, Paper, Select, TextField, Typography } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { Guest } from "../types";
const GuestDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [guest, setGuest] = useState<Guest>();

  // const [day1, setDay1] = useState(false)
  // const [day2, setDay2] = useState(false)
  // const [day3, setDay3] = useState(false)
  // const [day4, setDay4] = useState(false)
  // const [day5, setDay5] = useState(false)

  useEffect(() => {
    const refId = location.state.guestId;
    onValue(
      ref(db, "/guests/" + refId),
      (snapshot) => {
        if (snapshot) {
          setGuest(snapshot.val());
        }
      },
      {
        onlyOnce: true,
      },
    );
  }, [location]);

  if (!guest) {
    return <Typography variant="h3">Guest not found</Typography>;
  }

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "15px",
      }}
    >
      <Typography variant="h2">Guest Details</Typography>
      {guest.isStudent ? (
        <Typography variant="h5" sx={{ color: "red" }}>
          Check Student ID
        </Typography>
      ) : null}
      {!guest.paid ? (
        <Typography variant="h5" sx={{ color: "red" }}>
          Not Paid
        </Typography>
      ) : null}
      <TextField
        type="text"
        id="name"
        label="Name"
        variant="outlined"
        value={guest.guestName}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="email"
        label="Email"
        variant="outlined"
        value={guest.email}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="adults"
        label="Adults"
        variant="outlined"
        value={guest.adults}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="children"
        label="Children"
        variant="outlined"
        value={guest.children}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="nonveg"
        label="Non Veg"
        variant="outlined"
        value={guest.non_vegetarian}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="day1"
        label="Sosthi"
        variant="outlined"
        value={guest.day1}
        InputProps={{
          readOnly: true,
        }}
      />
      <Select>

      </Select>
      <TextField
        type="text"
        id="day2"
        label="Saptami"
        variant="outlined"
        value={guest.day2}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="day3"
        label="Astomi"
        variant="outlined"
        value={guest.day3}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="day4"
        label="Nobomi"
        variant="outlined"
        value={guest.day4}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="day5"
        label="Dosomi"
        variant="outlined"
        value={guest.day5}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="total"
        label="Total"
        variant="outlined"
        value={guest.total}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        type="text"
        id="message"
        label="Message"
        variant="outlined"
        value={guest.message}
        InputProps={{
          readOnly: true,
        }}
      />
      {location.state.isAdmin ? (
        <Button
          onClick={() =>
            navigate("/addguest", {
              state: { guest: guest, refId: location.state.guestId },
            })
          }
        >
          Edit
        </Button>
      ) : null}
      <Button onClick={() => navigate("/profile")}>Back</Button>
    </Paper>
  );
};

export default GuestDetails;
