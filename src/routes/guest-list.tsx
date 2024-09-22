import PaidIcon from "@mui/icons-material/Paid";
import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Grid, ListItem, ListItemAvatar, ListItemText, Paper, Radio, RadioGroup } from '@mui/material';
import List from '@mui/material/List';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GuestContext } from '../store/guest-context';
import { GuestTableRow } from '../types';
const compareStrings = (a: string, b: string) => {
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
}
interface GuestListProps { }
export default function GuestList(props: GuestListProps) {
    const navigate = useNavigate()
    const location = useLocation()

    const guestsCtx = useContext(GuestContext);
    const [value, setValue] = React.useState('4');

    const [time, setTime] = React.useState('Lunch');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    function getDay(g: GuestTableRow): React.ReactNode {
        switch (value) {
            case '1':
                return g.day1;
            case '2':
                return g.day2;
            case '3':
                return g.day3;
            case '4':
                return g.day4;
            case '5':
                return g.day5 === "Sindoor khela" ? "Full Day" : g.day5;

        }
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
                    <FormControlLabel value="1" control={<Radio />} label="Sosthi" />
                    <FormControlLabel value="2" control={<Radio />} label="Samptami" />
                    <FormControlLabel value="3" control={<Radio />} label="Astomi" />
                    <FormControlLabel value="4" control={<Radio />} label="Nobomi" />
                    <FormControlLabel value="5" control={<Radio />} label="Doshomi" />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel id="radio-buttons-group">Day</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={time}
                    onChange={(e) => setTime((e.target as HTMLInputElement).value)}
                >
                    <FormControlLabel value="Lunch" control={<Radio />} label="Lunch" />
                    <FormControlLabel value="Full day" control={<Radio />} label="Full Day" />
                    <FormControlLabel value="Dinner" control={<Radio />} label="Dinner" />
                    <FormControlLabel value="Visitor" control={<Radio />} label="Visitor" />
                </RadioGroup>
            </FormControl>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {guestsCtx && guestsCtx.guests.sort((a, b) => compareStrings(a.guestName, b.guestName))
                    .filter(g => {

                        console.log(value, time, g.guestName, g.attendence_day1)
                        if ((value === "1" && g.day1.localeCompare(time) === 0)
                            || (value === "2" && g.day2.localeCompare(time) === 0)
                            || (value === "3" && g.day3.localeCompare(time) === 0)
                            || (value === "4" && g.day4.localeCompare(time) === 0)) {
                            return true;
                        } else if (value === "5") {
                            if (time === "Full day" && g.day5 === 'Sindoor khela') {
                                return true
                            } else if (time === "Visitor" && g.day5 === 'Visitor') {
                                return true
                            }
                        }
                        return false;
                    }


                    )

                    .map(g => <ListItem key={g.email}>
                        <ListItemAvatar>
                            <Avatar>
                                {<PaidIcon htmlColor={g.paid ? "green" : "red"} />}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={g.guestName} secondary={<React.Fragment>
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
                                    <span>{getDay(g)}</span>
                                </Grid>
                            </Grid>
                            {location.state.isAdmin ?
                                <Button onClick={() => navigate("/guestdetails", {
                                    state: {
                                        guestId: g.id
                                    },
                                })}>Edit</Button> : null}
                        </React.Fragment>} />
                    </ListItem>

                    )}


            </List>

            <Button onClick={() => navigate('/profile')}>Back</Button>
        </Paper>
    );
}