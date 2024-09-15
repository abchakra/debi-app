import PaidIcon from "@mui/icons-material/Paid";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { GuestTableRow } from "../types";

interface GuestTableProps {
  guests: GuestTableRow[];
  total: number;
}
const GuestTable = (props: GuestTableProps) => {
  // const writeUserData = (refId: string) => {
  //   console.log(refId);
  //   update(ref(db, "guests/" + refId), {
  //     paid: true,
  //   })
  //     .then(() => {
  //       console.log("Data updated successfully");
  //     })
  //     .catch((error: any) => {
  //       console.log("Unsuccessful");
  //       console.log(error);
  //     });
  // };

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<GuestTableRow>[]>(
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
    [props.total]
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
