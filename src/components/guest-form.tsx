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

const FoodOptions = [
  {
    label: "None",
    value: "0",
  },
  {
    label: "Full day",
    value: "1",
  },
];
const PujaDayOptions = [
  {
    label: "None",
    value: "0",
  },
  {
    label: "Full day",
    value: "1",
  },
  {
    label: "Lunch Only",
    value: "2",
  },
  {
    label: "Dinner Only",
    value: "3",
  },
  {
    label: "Visitor",
    value: "4",
  },
];

interface IFormInput {
  email: string;
  adults: number;
  children: number;
  non_vegetarian: number;
  vegetarian: number;
  day1: number;
  day2: number;
  day3: number | null;
  day4: number | null;
  day5: number | null;
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
  day1: undefined,
  day2: undefined,
  day3: undefined,
  day4: undefined,
  day5: undefined,
  guestName: "",
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
      adults: data.adults,
      children: data.children,
      non_vegetarian: data.non_vegetarian,
      vegetarian: data.vegetarian,
      day1: data.day1,
      day2: data.day2,
      day3: data.day3,
      day4: data.day4,
      day5: data.day5,
      guestName: data.guestName,
      isPresent: data.isPresent,
      isStudent: data.isStudent,
      message: data.message,
      paid: data.paid,
      total: data.total,
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

      <FormInputCheckbox name={"isVeg"} control={control} label={"Veg"} />

      <FormInputCheckbox name={"isCar"} control={control} label={"Car"} />

      <FormInputCheckbox name={"isPaid"} control={control} label={"Paid"} />

      <FormInputCheckbox
        name={"all5days"}
        control={control}
        label={"All 5 Days"}
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
