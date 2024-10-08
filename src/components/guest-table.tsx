import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PaidIcon from "@mui/icons-material/Paid";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { ref, remove, update } from "firebase/database";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { GuestTableRow } from "../types";
interface GuestTableProps {
  guests: GuestTableRow[];
  total: number;
  paidTotal: number;
  isAdmin: boolean;
}

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const GuestTable = (props: GuestTableProps) => {
  const navigate = useNavigate();

  const displayGuest = (guestId: string) => {
    // console.log(guestId);
    navigate("/guestdetails", {
      state: {
        guestId: guestId,
        isAdmin: props.isAdmin,
      },
    });
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
        editSelectOptions: ["true", "false"],
        editVariant: "select",
        // muiEditTextFieldProps: {
        //   required: true,
        //   type: 'boolean',
        //   variant: 'outlined',
        // },
        Footer: () => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Paid: {props.paidTotal.toFixed(2)} </span>{" "}
            <span>
              UnPaid: {Math.abs(props.total - props.paidTotal).toFixed(2)}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "total",
        header: "Total",
        size: 50,
        filterVariant: "range",
        Footer: () => <div>Total: {props.total.toFixed(2)}</div>,
      },
      {
        accessorKey: "adults", //normal accessorKey
        header: "Adults",
        size: 20,
        aggregationFn: "sum",
        AggregatedCell: ({ cell, table }) => (
          <>
            <Box
              sx={{ color: "info.main", display: "inline", fontWeight: "bold" }}
            >
              {cell.getValue<number>()}
            </Box>
          </>
        ),
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
        filterSelectOptions: [
          { label: "Car", value: "Car" },
          { label: "Public", value: "	Public Transport" },
        ],
        filterVariant: "select",
      },
      {
        accessorKey: "day1",
        header: "Shashthi",
        size: 50,
        filterSelectOptions: [
          { label: "Full Day", value: "full day" },
          { label: "Visitor", value: "visitor" },
        ],
        filterVariant: "multi-select",
      },
      {
        accessorKey: "day2",
        header: "Saptami",
        size: 50,
        filterSelectOptions: [
          { label: "Dinner", value: "dinner" },
          { label: "Lunch", value: "lunch" },
          { label: "Full Day", value: "full day" },
          { label: "Visitor", value: "visitor" },
        ],
        filterVariant: "multi-select",
      },
      {
        accessorKey: "day3",
        header: "Ashtami",
        size: 50,
        filterSelectOptions: [
          { label: "Dinner", value: "dinner" },
          { label: "Lunch", value: "lunch" },
          { label: "Full Day", value: "full day" },
          { label: "Visitor", value: "visitor" },
        ],
        filterVariant: "multi-select",
      },
      {
        accessorKey: "day4",
        header: "Nabami",
        size: 50,
        filterSelectOptions: [
          { label: "Dinner", value: "dinner" },
          { label: "Lunch", value: "lunch" },
          { label: "Full Day", value: "full day" },
          { label: "Visitor", value: "visitor" },
        ],
        filterVariant: "multi-select",
      },
      {
        accessorKey: "day5",
        header: "Dashami",
        size: 50,
        filterSelectOptions: [
          { label: "Sindoor khela", value: "sindoor khela" },
          { label: "Visitor", value: "visitor" },
        ],
        filterVariant: "multi-select",
      },

      {
        accessorKey: "email",
        header: "EMail",
        size: 30,
      },
    ],
    [props.total, props.paidTotal],
  );

  const table = useMaterialReactTable({
    columns,
    data: props.guests,
    enableRowDragging: false,
    enableColumnOrdering: true,
    enableDensityToggle: false,
    enableColumnFilters: true,
    initialState: {
      density: "compact",
      pagination: { pageSize: 200, pageIndex: 0 },
    },

    editDisplayMode: "row",
    enableEditing: props.isAdmin,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              const guestRef = ref(db, "guests/" + row.original.id);
              remove(guestRef).then(() =>
                console.log("Deleted", row.original.id),
              );
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    onEditingRowCancel: () => {
      //clear any validation errors
    },
    muiTableBodyRowProps: ({ row }) => ({
      onDoubleClick: (event) => {
        displayGuest(row.original.id);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    onEditingRowSave: ({ row, table, values }) => {
      //validate data

      try {
        values.adults = Number(values.adults);
        values.children = Number(values.children);
        values.vegetarian = Number(values.vegetarian);
        values.non_vegetarian = Number(values.non_vegetarian);
        values.total = Number(values.total);
        values.paid = values.paid.toLowerCase() === "true";

        //save data to api

        console.log(row.original.id, values);

        update(ref(db, "guests/" + row.original.id), values)
          .then(() => {
            console.log("Data updated successfully");
          })
          .catch((error: any) => {
            console.log("Unsuccessful");
            console.log(error);
          });

        table.setEditingRow(null); //exit editing mode
      } catch (error: any) {
        console.log(error);
      }
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
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
    ),
  });

  return (
    <Box>
      <Typography>
        Adults :{" "}
        {table
          .getFilteredRowModel()
          .rows.reduce((result, item) => result + item.original.adults, 0)}
      </Typography>
      <Typography>
        Children :{" "}
        {table
          .getFilteredRowModel()
          .rows.reduce((result, item) => result + item.original.children, 0)}
      </Typography>
      <Typography>
        Veg :{" "}
        {table
          .getFilteredRowModel()
          .rows.reduce((result, item) => result + item.original.vegetarian, 0)}
      </Typography>
      <Typography>
        Non-Veg :{" "}
        {table
          .getFilteredRowModel()
          .rows.reduce(
            (result, item) => result + item.original.non_vegetarian,
            0,
          )}
      </Typography>

      <MaterialReactTable table={table} />
    </Box>
  );
};

export default GuestTable;
