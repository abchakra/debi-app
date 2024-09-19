import { Avatar, Button, FormControl, FormControlLabel, FormLabel, ListItem, ListItemAvatar, ListItemText, Paper, Radio, RadioGroup } from '@mui/material';
import List from '@mui/material/List';
import React, { useContext } from 'react';
import { GuestContext } from '../store/guest-context';

import PaidIcon from "@mui/icons-material/Paid";
import { useNavigate } from 'react-router-dom';


export default function GuestList() {
    const navigate = useNavigate()
    const guestsCtx = useContext(GuestContext);
    const [value, setValue] = React.useState('4');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

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
                {guestsCtx && guestsCtx.guests.filter(g => (value === "1" && g.day1 !== "None")
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
                            {/* <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        Adults {g.adults}
                        Children {g.children}
                    </Typography> */}
                            <div style={{ display: "flex", flexDirection: 'column' }}>
                                <span>Adults: {g.adults}</span>
                                <span>Children: {g.children}</span>
                                <span>Total: {g.total}</span>
                                <span>Veg: {g.vegetarian}</span>
                                <span>Non-Veg: {g.non_vegetarian}</span>

                            </div>

                        </React.Fragment>} />
                    </ListItem>

                    )}


            </List>

            <Button onClick={() => navigate('/profile')}>Back</Button>
        </Paper>
    );
}