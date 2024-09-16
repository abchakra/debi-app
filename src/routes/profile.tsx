import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import GuestTable from "../components/guest-table";
import StackedColumnChart from "../components/stacked-column-chart";
import { db } from "../firebase/firebase";
import { GuestTableRow } from "../types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}


function Profile() {
  // const { currentUser } = useContext(AuthContext);
  const [guests, setGuests] = useState<GuestTableRow[]>([]);
  // const navigate = useNavigate();
  const [value, setValue] = useState(0);
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          {/* <Button
            // variant="contained"
            color="inherit"
            onClick={() => {
              if (currentUser) {
                navigate("/addguest");
              }
            }}
          >
            Add GuestTableRow
          </Button> */}
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
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Statistics
          </AccordionSummary>
          <AccordionDetails>


            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="days" variant="scrollable">
                <Tab label="Day1" {...a11yProps(0)} />
                <Tab label="Day2" {...a11yProps(1)} />
                <Tab label="Day3" {...a11yProps(2)} />
                <Tab label="Day4" {...a11yProps(3)} />
                <Tab label="Day5" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <CardContent>
                <Typography>Total</Typography>
                {/* <Typography> FullDay: {fullDay[0]} Children:{fullDayC[0]}</Typography> */}
                <Typography> Lunch: {fullDay[0] + lunch[0]} Children:{fullDayC[0] + lunchC[0]}</Typography>
                <Typography> Dinner: {fullDay[0] + dinner[0]} Children:{fullDayC[0] + dinnerC[0]}</Typography>
                <Typography> Visitor: {visitor[0]} Children:{visitorC[0]}</Typography>
              </CardContent>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CardContent>
                <Typography>Total</Typography>
                {/* <Typography> FullDay: {fullDay[1]} Children:{fullDayC[1]}</Typography> */}
                <Typography> Lunch: {fullDay[1] + lunch[1]} Children:{fullDayC[1] + lunchC[1]}</Typography>
                <Typography> Dinner: {fullDay[1] + dinner[1]} Children:{fullDayC[1] + dinnerC[1]}</Typography>
                <Typography> Visitor: {visitor[1]} Children:{visitorC[1]}</Typography>
              </CardContent>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <CardContent>
                <Typography>Total</Typography>
                {/* <Typography> FullDay: {fullDay[2]} Children:{fullDayC[2]}</Typography> */}
                <Typography> Lunch: {fullDay[2] + lunch[2]} Children:{fullDayC[2] + lunchC[2]}</Typography>
                <Typography> Dinner: {fullDay[2] + dinner[2]} Children:{fullDayC[2] + dinnerC[2]}</Typography>
                <Typography> Visitor: {visitor[2]} Children:{visitorC[2]}</Typography>
              </CardContent>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <CardContent>
                <Typography>Total</Typography>
                {/* <Typography> FullDay: {fullDay[3]} Children:{fullDayC[3]}</Typography> */}
                <Typography> Lunch: {fullDay[3] + lunch[3]} Children:{fullDayC[3] + lunchC[3]}</Typography>
                <Typography> Dinner: {fullDay[3] + dinner[3]} Children:{fullDayC[3] + dinnerC[3]}</Typography>
                <Typography> Visitor: {visitor[3]} Children:{visitorC[3]}</Typography>
              </CardContent>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <CardContent>
                <Typography>Total</Typography>
                <Typography> Lunch: {fullDay[4]} Children:{fullDayC[3]}</Typography>
                {/* <Typography> Lunch: {fullDay[4] + lunch[4]} Children:{fullDayC[4] + lunchC[4]}</Typography> */}
                <Typography> Visitor: {visitor[4]} Children:{visitorC[4]}</Typography>
              </CardContent>
            </CustomTabPanel>



          </AccordionDetails>
        </Accordion>
      </Card>
      <Card sx={{}}>
        <CardContent>
          {guests.length > 0 ? (
            <GuestTable guests={guests} total={total} paidTotal={paidTotal}></GuestTable>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
export default Profile;
