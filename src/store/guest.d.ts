export type GuestAction =
  | { type: "ADD"; payload: Guest }
  | { type: "UPDATE"; payload: { id: string; guest: Guest } }
  | { type: "DELETE"; payload: id }
  | { type: "SET"; payload: GuestTableRow[] };
