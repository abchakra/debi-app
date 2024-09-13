import PaidIcon from "@mui/icons-material/Paid";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { Guest } from "../types";

interface GuestTableProps {
  guests: Guest[];
  total: number;
}
const GuestTable = (props: GuestTableProps) => {
  // const [total, setTotal] = useState("00.00");

  // useEffect(() => {
  //   const val = props.guests.reduce((acc, row) => acc + row.total, 0);

  //   setTotal(val.toFixed(2));
  // }, [props.guests]);

  // console.log(">>>>>>>>", total, props.guests.length);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Guest>[]>(
    () => [
      {
        accessorKey: "guestName", //access nested data with dot notatio
        header: "Guest Name",
        size: 150,
      },
      {
        accessorKey: "adults", //normal accessorKey
        header: "Adults",
        size: 50,
        // Footer: () => <div>{totalAdults}</div>,
      },
      {
        accessorKey: "children",
        header: "Children",
        size: 50,
        // Footer: () => <div>{totalChildren}</div>,
      },
      // {
      //   accessorKey: "isStudent",
      //   header: "Category",
      //   size: 50,
      //   Cell: ({ cell }) => (
      //     <span>
      //       {cell.getValue<boolean>() ? <BadgeIcon htmlColor="green" /> : <></>}
      //     </span>
      //   ),
      // },
      // {
      //   accessorKey: "vegetarian",
      //   header: "Food Preference",
      //   size: 50,
      //   Cell: ({ cell }) => (
      //     <span>
      //       {cell.getValue<boolean>() ? (
      //         <FastfoodIcon htmlColor="green" />
      //       ) : (
      //         <FastfoodIcon htmlColor="red" />
      //       )}
      //     </span>
      //   ),
      // },
      // {
      //   accessorKey: "isCar",
      //   header: "Transportation",
      //   size: 50,
      //   Cell: ({ cell }) => (
      //     <span>
      //       {cell.getValue<boolean>() ? (
      //         <DirectionsCarIcon htmlColor="green" />
      //       ) : (
      //         <AirportShuttleIcon htmlColor="red" />
      //       )}
      //     </span>
      //   ),
      // },
      {
        accessorKey: "day1",
        header: "Shashthi",
        size: 50,
      },
      {
        accessorKey: "day2",
        header: "Saptami",
        size: 50,
      },
      {
        accessorKey: "day3",
        header: "Ashtami",
        size: 50,
      },
      {
        accessorKey: "day4",
        header: "Nabami",
        size: 50,
      },
      {
        accessorKey: "day5",
        header: "Dashami",
        size: 50,
      },
      {
        accessorKey: "paid",
        header: "Paid",
        size: 50,
        Cell: ({ cell }) => (
          <span>
            {cell.getValue<boolean>() ? (
              <PaidIcon htmlColor="green" />
            ) : (
              <PaidIcon htmlColor="red" />
            )}
          </span>
        ),
      },
      {
        accessorKey: "total",
        header: "Total",
        size: 50,
        Footer: () => <div>Total: {props.total.toFixed(2)}</div>,
      },
    ],
    [props.guests]
  );

  const table = useMaterialReactTable({
    columns,
    data: props.guests,
    enableDensityToggle: false,
    enableColumnFilters: true,
    initialState: {
      density: "compact",
    },
  });

  return <MaterialReactTable table={table} />;
};

export default GuestTable;
