import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import * as React from "react";

interface ToggleProps {
  attendance: boolean;
  handleToggle: (v: boolean) => void;
}
export default function StandaloneToggleButton(props: ToggleProps) {
  const [selected, setSelected] = React.useState(props.attendance);

  React.useEffect(() => {
    props.handleToggle(!selected);
    // eslint-disable-next-line
  }, [selected]);

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <CheckIcon htmlColor={selected ? "green" : "red"} />
    </ToggleButton>
  );
}
