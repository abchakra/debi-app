import { Button, Paper, Typography } from "@mui/material";
import { push, ref } from "firebase/database";
import { useForm } from "react-hook-form";
import { db } from "../firebase/firebase";
import { Guest } from "../types";
import { FormInputCheckbox } from "./widgets/form-input-checkbox";
import { FormInputDropdown } from "./widgets/form-input-dropdown";
import { FormInputNumber } from "./widgets/form-input-number.";
import { FormInputText } from "./widgets/form-input-text";
// Import firebase configuration from firebase.ts file


const PujaDayOptions = [
  {
    label: "None",
    value: "None",
  },
  {
    label: "Full day",
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

interface IFormInput {
  email: string;
  adults: number;
  children: number;
  non_vegetarian: number;
  transport: string;
  vegetarian: number;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  guestName: string;
  isPresent: boolean;
  isStudent: boolean;
  message: string;
  paid: boolean;
  total: number;
}

const defaultValues = {
  email: "",
  adults: 1,
  children: 0,
  non_vegetarian: 0,
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
  message: "",
  paid: false,
  total: 0,
};

const GuestForm = () => {
  const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });

  const addGuest = (data: IFormInput) => {
    const guestRef = ref(db, "/guests");
    const guest: Guest = {
      email: data.email,
      adults: Number(data.adults),
      children: Number(data.children),
      non_vegetarian: Number(data.non_vegetarian),
      vegetarian: Number(data.vegetarian),
      day1: data.day1,
      day2: data.day2,
      day3: data.day3,
      day4: data.day4,
      day5: data.day5,
      transport: data.transport,
      guestName: data.guestName,
      isPresent: data.isPresent,
      isStudent: data.isStudent,
      message: data.message,
      paid: Boolean(data.paid),
      total: Number(data.total),
    };
    push(guestRef, guest);
  };

  const onSubmit = (data: IFormInput) => {
    console.log(data);

    addGuest(data);
  };
  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      <Typography variant="h4"> Form Demo</Typography>

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
        options={PujaDayOptions}
        name="day5"
        control={control}
        label="Doshomi"
      />
      <FormInputNumber
        name={"total"}
        control={control}
        setValue={setValue}
        label={"Total"}
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Paper>
  );
};

export default GuestForm;
