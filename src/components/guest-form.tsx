import { Button, Paper, Typography } from "@mui/material";
import { push, ref, update } from "firebase/database";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { Guest } from "../types";
import { FormInputCheckbox } from "./widgets/form-input-checkbox";
import { FormInputDropdown } from "./widgets/form-input-dropdown";
import { FormInputNumber } from "./widgets/form-input-number.";
import { FormInputText } from "./widgets/form-input-text";
// Import firebase configuration from firebase.ts file



const PujaDay5Options = [
  {
    label: "None",
    value: "None",
  },
  {
    label: "Sindoor khela",
    value: "Sindoor khela",
  },
  {
    label: "Visitor",
    value: "Visitor",
  },
];
const TransportOptions =
  [{
    label: "Car",
    value: "Car",
  },
  {
    label: "Public",
    value: "Public Transportation",
  },]


const PujaDayOptions = [
  {
    label: "None",
    value: "None",
  },
  {
    label: "Full Day",
    value: "Full Day",
  },
  {
    label: "Lunch Only",
    value: "Lunch",
  },
  {
    label: "Dinner Only",
    value: "Dinner",
  },
  {
    label: "Visitor",
    value: "Visitor",
  },
];



const defaultValues = {
  email: "",
  adults: 1,
  children: 0,
  non_vegetarian: 1,
  vegetarian: 0,
  day1: "None",
  day2: "None",
  day3: "None",
  day4: "None",
  day5: "None",
  guestName: "",
  transport: "Car",
  isPresent: false,
  isStudent: false,
  attendence_day1: false,
  attendence_day2: false,
  attendence_day3: false,
  attendence_day4: false,
  attendence_day5: false,
  message: "",
  paid: false,
  total: 25,
};

const GuestForm = () => {

  const location = useLocation();

  const { handleSubmit, reset, control, setValue } = useForm<Guest>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (location.state)
      reset(location.state.guest)
  }, [reset, location])

  const navigate = useNavigate();
  const addGuest = (data: Guest) => {
    // const guest: Guest = {
    //   email: data.email,
    //   adults: Number(data.adults),
    //   children: Number(data.children),
    //   non_vegetarian: Number(data.non_vegetarian),
    //   vegetarian: Number(data.vegetarian),
    //   day1: data.day1,
    //   day2: data.day2,
    //   day3: data.day3,
    //   day4: data.day4,
    //   day5: data.day5,
    //   transport: data.transport,
    //   guestName: data.guestName,
    //   isPresent: data.isPresent,
    //   isStudent: data.isStudent,
    //   message: data.message,
    //   paid: Boolean(data.paid),
    //   total: Number(data.total),
    //   attendence_day1: Boolean(data.attendence_day1),
    //   attendence_day2: false,
    //   attendence_day3: false,
    //   attendence_day4: false,
    //   attendence_day5: false,
    // };
    if (location.state) {

      update(ref(db, "guests/" + location.state.refId), data)
        .then(() => {
          console.log("Data updated successfully");
        })
        .catch((error: any) => {
          console.log("Unsuccessful");
          console.log(error);
        });
    } else {
      const guestRef = ref(db, "/guests");

      push(guestRef, data);
    }
    navigate("/profile")
  };

  const onSubmit = (data: Guest) => {
    console.log(data);

    addGuest(data);
  };
  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "5px",
        // margin: "10px 300px",
      }}
    >
      <Typography variant="h4"> {location.state ? "Edit Guest" : "Add Guest"}</Typography>

      <FormInputText name="guestName" control={control} label="Guest Name" />

      <FormInputNumber
        name={"adults"}
        control={control}
        setValue={setValue}
        label={"Adults"}
      />
      <FormInputNumber
        name={"children"}
        control={control}
        setValue={setValue}
        label={"Children"}
      />

      <FormInputCheckbox
        name={"isStudent"}
        control={control}
        label={"Student"}
      />

      <FormInputNumber
        name={"vegetarian"}
        control={control}
        setValue={setValue}
        label={"Vegetarian"}
      />
      <FormInputNumber
        name={"non_vegetarian"}
        control={control}
        setValue={setValue}
        label={"Non Vegetarian"}
      />

      {/* <FormInputCheckbox name={"isPaid"} control={control} label={"Paid"} /> */}
      <FormInputText
        name={"email"}
        control={control}
        setValue={setValue}
        label={"email"}
      />
      <FormInputDropdown
        options={TransportOptions}
        name="transport"
        control={control}
        label="Transportation"
      />

      <FormInputDropdown
        options={PujaDayOptions}
        name="day1"
        control={control}
        label="Sosthi"
      />
      <FormInputDropdown
        options={PujaDayOptions}
        name="day2"
        control={control}
        label="Saptami"
      />
      <FormInputDropdown
        options={PujaDayOptions}
        name="day3"
        control={control}
        label="Astomi"
      />
      <FormInputDropdown
        options={PujaDayOptions}
        name="day4"
        control={control}
        label="Nobomi"
      />
      <FormInputDropdown
        options={PujaDay5Options}
        name="day5"
        control={control}
        label="Doshomi"
      />
      <FormInputCheckbox
        name="paid"
        control={control}
        label="Paid"
      />
      <FormInputNumber
        name={"total"}
        control={control}
        setValue={setValue}
        label={"Total"}
      />
      <FormInputCheckbox
        name="attendence_day1"
        control={control}
        label="Day1 Attendance"
      />
      <FormInputCheckbox
        name="attendence_day2"
        control={control}
        label="Day2 Attendance"
      />
      <FormInputCheckbox
        name="attendence_day3"
        control={control}
        label="Day3 Attendance"
      />
      <FormInputCheckbox
        name="attendence_day4"
        control={control}
        label="Day4 Attendance"
      />
      <FormInputCheckbox
        name="attendence_day5"
        control={control}
        label="Day5 Attendance"
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
      <Button onClick={() => navigate('/profile')} variant={"outlined"}>
        Cancel
      </Button>
    </Paper>
  );
};

export default GuestForm;
