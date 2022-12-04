import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers(props) {
  const [value, setValue] = React.useState(props.value === ''? '': props.value);

  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChange(newValue.toString());
  };


  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Date-Returned"
          inputFormat="MM/DD/YYYY"
          disablePast
          minDate={props.minDate}
          disabled={props.disabled}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
