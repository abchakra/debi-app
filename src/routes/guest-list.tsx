import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Grid, ListItem, ListItemAvatar, ListItemText, Paper, Radio, RadioGroup } from '@mui/material';
import List from '@mui/material/List';
import React, { useContext } from 'react';
import { GuestContext } from '../store/guest-context';

import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from 'react-router-dom';
import { GuestTableRow } from '../types';

const compareStrings = (a: string, b: string) => {
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
}


export default function GuestList() {
    const navigate = useNavigate()
    const guestsCtx = useContext(GuestContext);
    const [value, setValue] = React.useState('4');

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
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {guestsCtx && guestsCtx.guests.sort((a, b) => compareStrings(a.guestName, b.guestName)).filter(g => (value === "1" && g.day1 !== "None")
                    || (value === "2" && g.day2 !== "None")
                    || (value === "3" && g.day3 !== "None")
                    || (value === "4" && g.day4 !== "None")
                    || (value === "5" && g.day5 !== "None"))

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

                        </React.Fragment>} />
                    </ListItem>

                    )}


            </List>

            <Button onClick={() => navigate('/profile')}>Back</Button>
        </Paper>
    );
}