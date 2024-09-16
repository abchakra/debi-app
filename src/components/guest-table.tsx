import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PaidIcon from "@mui/icons-material/Paid";
import { Box, Button } from "@mui/material";
import { download, generateCsv, mkConfig } from 'export-to-csv';
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
  paidTotal: number
}

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});


const GuestTable = (props: GuestTableProps) => {
  const writeUserData = (_refId: string) => {
    // console.log(refId);
    // update(ref(db, "guests/" + refId), {
    //   paid: true,
    // })
    //   .then(() => {
    //     console.log("Data updated successfully");
    //   })
    //   .catch((error: any) => {
    //     console.log("Unsuccessful");
    //     console.log(error);
    //   });
  };
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(props.guests);
    download(csvConfig)(csv);
  };
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<GuestTableRow>[]>(
    () => [
      {
        accessorKey: "guestName", //access nested data with dot notatio
        header: "Guest Name",
        size: 100,
      },
      {
        accessorKey: "adults", //normal accessorKey
        header: "Adults",
        size: 20,
        // Footer: () => <div>{totalAdults}</div>,
      },
      {
        accessorKey: "children",
        header: "Children",
        size: 20,
        // Footer: () => <div>{totalChildren}</div>,
      },
      {
        accessorKey: "non_vegetarian",
        header: "Non-Veg",
        size: 30,
      },
      {
        accessorKey: "vegetarian",
        header: "Veg",
        size: 30,
      },
      {
        accessorKey: "transport",
        header: "Transportation",
        size: 30,
      },
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
        Footer: () => <div>Paid: {props.paidTotal.toFixed(2)}</div>,
      },
      {
        accessorKey: "total",
        header: "Total",
        size: 50,
        Footer: () => <div>Total: {props.total.toFixed(2)}</div>,
      },
      {
        accessorKey: "email",
        header: "EMail",
        size: 30,
      },
    ],
    [props.total, props.paidTotal]
  );

  const table = useMaterialReactTable({
    columns,
    data: props.guests,
    enableDensityToggle: false,
    enableColumnFilters: true,
    initialState: {
      density: "compact",
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        writeUserData(row.original.id)
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
      </Box>
    )
  });

  return <MaterialReactTable table={table} />;
};

export default GuestTable;
