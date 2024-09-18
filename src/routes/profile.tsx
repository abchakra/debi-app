import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestTable from "../components/guest-table";
import StackedColumnChart from "../components/stacked-column-chart";
import { AuthContext } from "../context/auth-context";
import { db } from "../firebase/firebase";
import { GuestTableRow } from "../types";




function Profile() {
  const { currentUser, signOut } = useContext(AuthContext);

  const [isAdmin] = useState(currentUser?.email === "admin@gmail.com");
  const [guests, setGuests] = useState<GuestTableRow[]>([]);
  const navigate = useNavigate();
  const [fullDay, setFullDay] = useState([0, 0, 0, 0, 0]);
  const [lunch, setLunch] = useState([0, 0, 0, 0, 0]);
  const [dinner, setDinner] = useState([0, 0, 0, 0, 0]);
  const [visitor, setVisitor] = useState([0, 0, 0, 0, 0]);

  const [fullDayC, setFullDayC] = useState([0, 0, 0, 0, 0]);
  const [lunchC, setLunchC] = useState([0, 0, 0, 0, 0]);
  const [dinnerC, setDinnerC] = useState([0, 0, 0, 0, 0]);
  const [visitorC, setVisitorC] = useState([0, 0, 0, 0, 0]);

  const [total, setTotal] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);



  const updateValue = (
    value: string,
    day: number,
    adults: number,
    children: number,
    fullDay: number[],
    lunch: number[],
    dinner: number[],
    visitor: number[],
    fullDayC: number[],
    lunchC: number[],
    dinnerC: number[],
    visitorC: number[]
  ): void => {
    if (value) {
      if (value.toLowerCase().trim() === "full day") {
        fullDay[day] = fullDay[day] + adults;
        fullDayC[day] = fullDayC[day] + children;
      } else if (value === "Sindoor khela") {
        fullDay[day] = fullDay[day] + adults;
        fullDayC[day] = fullDayC[day] + children;
      } else if (value === "Dinner") {
        dinner[day] = dinner[day] + adults;
        dinnerC[day] = dinnerC[day] + children;
      } else if (value === "Lunch") {
        lunch[day] = lunch[day] + adults;
        lunchC[day] = lunchC[day] + children;
      } else if (value === "Visitor") {
        visitor[day] = visitor[day] + adults;
        visitorC[day] = visitorC[day] + children;
      }
    }
  };

  useEffect(() => {
    const query = ref(db, "guests");
    return onValue(query, (snapshot) => {
      let totalTicketsSold = 0;
      let totalPayment = 0;
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newGuestList: GuestTableRow[] = [];

        const fullDay = [0, 0, 0, 0, 0];
        const lunch = [0, 0, 0, 0, 0];
        const dinner = [0, 0, 0, 0, 0];
        const visitor = [0, 0, 0, 0, 0];

        const fullDayC = [0, 0, 0, 0, 0];
        const lunchC = [0, 0, 0, 0, 0];
        const dinnerC = [0, 0, 0, 0, 0];
        const visitorC = [0, 0, 0, 0, 0];

        for (let id in data) {
          newGuestList.push({ id, ...data[id] });

          const adults = data[id].adults;
          const children = data[id].children;
          totalTicketsSold += data[id].total;
          if (data[id].paid) {
            totalPayment += data[id].total;
          }
          updateValue(
            data[id].day1,
            0,
            adults,
            children,
            fullDay,
            lunch,
            dinner,
            visitor,
            fullDayC,
            lunchC,
            dinnerC,
            visitorC
          );
          updateValue(
            data[id].day2,
            1,
            adults,
            children,
            fullDay,
            lunch,
            dinner,
            visitor,
            fullDayC,
            lunchC,
            dinnerC,
            visitorC
          );
          updateValue(
            data[id].day3,
            2,
            adults,
            children,
            fullDay,
            lunch,
            dinner,
            visitor,
            fullDayC,
            lunchC,
            dinnerC,
            visitorC
          );
          updateValue(
            data[id].day4,
            3,
            adults,
            children,
            fullDay,
            lunch,
            dinner,
            visitor,
            fullDayC,
            lunchC,
            dinnerC,
            visitorC
          );
          updateValue(
            data[id].day5,
            4,
            adults,
            children,
            fullDay,
            lunch,
            dinner,
            visitor,
            fullDayC,
            lunchC,
            dinnerC,
            visitorC
          );
        }
        setTotal(totalTicketsSold);
        setPaidTotal(totalPayment)
        setGuests(newGuestList);
        setFullDay(fullDay);
        setLunch(lunch);
        setDinner(dinner);
        setVisitor(visitor);

        setFullDayC(fullDayC);
        setLunchC(lunchC);
        setDinnerC(dinnerC);
        setVisitorC(visitorC);

        // console.log(newGuestList);
      }
    });
  }, []);

  return (
    <Container sx={{ padding: 2, margin: 2 }} maxWidth={false}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DeBI e.V. DurgaPujo 2024
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Current User:{currentUser?.email}
          </Typography>
          {isAdmin ?
            <Button
              // variant="contained"
              color="inherit"
              onClick={() => {
                if (currentUser) {
                  navigate("/addguest");
                }
              }}
            >
              Add Guest
            </Button> : <></>

          }

          <Button
            // variant="contained"
            color="inherit"
            onClick={() => signOut()}
          >
            SignOut
          </Button>
        </Toolbar>
      </AppBar>

      <Card sx={{}}>
        <CardContent>
          <StackedColumnChart
            fullDay={fullDay}
            lunch={lunch}
            dinner={dinner}
            visitor={visitor}
            fullDayC={fullDayC}
            lunchC={lunchC}
            dinnerC={dinnerC}
            visitorC={visitorC}
          ></StackedColumnChart>
        </CardContent>
      </Card>
      <Card sx={{}}>
        <CardContent>
          {guests.length > 0 ? (
            <GuestTable guests={guests} total={total} paidTotal={paidTotal} isAdmin={isAdmin}></GuestTable>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
export default Profile;
