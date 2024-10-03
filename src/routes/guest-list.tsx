import CheckIcon from "@mui/icons-material/Check";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  ToggleButton,
} from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase-context";
import { GuestTableRow } from "../types";
const compareStrings = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;

  return 0;
};
interface GuestListProps { }
export default function GuestList(props: GuestListProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { guests } = useFirebase();

  const [value, setValue] = React.useState("1");

  const [time, setTime] = React.useState("full day");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log((event.target as HTMLInputElement).value);
    setValue((event.target as HTMLInputElement).value);
  };

  function getDay(g: GuestTableRow): String {
    switch (value) {
      case "1":
        return g.day1;
      case "2":
        return g.day2;
      case "3":
        return g.day3;
      case "4":
        return g.day4;
      case "5":
        return g.day5.toLowerCase().trim() === "sindoor khela" ? "full day" : g.day5;
    }
    return "None"
  }


  function getDayAttendance(g: GuestTableRow): boolean {
    switch (value) {
      case "1":
        return g.attendence_day1;
      case "2":
        return g.attendence_day2;
      case "3":
        return g.attendence_day3;
      case "4":
        return g.attendence_day4;
      case "5":
        return g.attendence_day5;
    }
    return false
  }

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "15px",
      }}
    >
      <FormControl>
        <FormLabel id="radio-buttons-group">Day</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel key="1" value="1" control={<Radio />} label="Sosthi" />
          <FormControlLabel key="2" value="2" control={<Radio />} label="Samptami" />
          <FormControlLabel key="3" value="3" control={<Radio />} label="Astomi" />
          <FormControlLabel key="4" value="4" control={<Radio />} label="Nobomi" />
          <FormControlLabel key="5" value="5" control={<Radio />} label="Doshomi" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="radio-buttons-group">Day</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={time}
          onChange={(e) => {
            // console.log((e.target as HTMLInputElement).value);
            setTime((e.target as HTMLInputElement).value)
          }}
        >
          <FormControlLabel
            key="lunch"
            value="lunch"
            control={<Radio />}
            label="Lunch" />
          <FormControlLabel
            key="full day"
            value="full day"
            control={<Radio />}
            label="Full Day"
          />
          <FormControlLabel
            key="dinner"
            value="dinner"
            control={<Radio />}
            label="Dinner" />
          <FormControlLabel
            key="visitor"
            value="visitor"
            control={<Radio />}
            label="Visitor"
          />
        </RadioGroup>
      </FormControl>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {guests
          .sort((a, b) => compareStrings(a.guestName, b.guestName))
          .filter((g) => {
            // console.log(value, time, g.guestName, g.day1, g.day2, g.day3, g.day4, g.day5);
            if (
              (value === "1" && g.day1 === time) ||
              (value === "2" && g.day2 === time) ||
              (value === "3" && g.day3 === time) ||
              (value === "4" && g.day4 === time)
            ) {
              return true;
            } else if (value === "5") {
              if (time === "full day" && g.day5.toLowerCase().trim() === "sindoor khela") {
                return true;
              } else if (time === "visitor" && g.day5.toLowerCase().trim() === "visitor") {
                return true;
              }
            }
            return false;
          })

          .map((g, i) => (
            <ListItem key={g.email + i}>
              <ListItemAvatar>
                <Avatar>
                  {<PaidIcon htmlColor={g.paid ? "green" : "red"} />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={g.guestName}
                secondary={
                  <React.Fragment>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <span>Adults: {g.adults}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span>Children: {g.children}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span>Veg: {g.vegetarian}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span>Non-Veg: {g.non_vegetarian}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span>Total: {g.total}</span>
                      </Grid>
                      <Grid item xs={6}>
                        <span>{getDay(g).toLowerCase().trim()}</span>
                      </Grid>
                      <Grid item xs={12}>
                        <span>Attendance: { }</span>
                        <ToggleButton
                          value="check"
                          selected={getDayAttendance(g)}
                          onChange={() => {
                            // setSelected(!getDayAttendance(g));
                          }}
                        >
                          <CheckIcon htmlColor={getDayAttendance(g) ? "green" : "red"} />
                        </ToggleButton>
                      </Grid>
                    </Grid>
                    {location.state.isAdmin ? (
                      <Button
                        onClick={() =>
                          navigate("/guestdetails", {
                            state: {
                              guestId: g.id,
                            },
                          })
                        }
                      >
                        Edit
                      </Button>
                    ) : null}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
      </List>

      <Button onClick={() => navigate("/profile")}>Back</Button>
    </Paper>
  );
}
