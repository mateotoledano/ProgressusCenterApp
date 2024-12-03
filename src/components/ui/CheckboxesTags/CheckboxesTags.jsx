import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxesTags = ({
  options = [],
  getOptionLabel = (option) => option.label || "",
  label = "Select Options",
  placeholder = "Choose...",
  onChange = () => {},
 
}) => {
  return (
    <Autocomplete
    sx={{bgcolor:"white" }}
    size="small"
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      onChange={(event, value) => onChange(value)}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li  key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {getOptionLabel(option)}
          </li>
        );
      }}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
};
