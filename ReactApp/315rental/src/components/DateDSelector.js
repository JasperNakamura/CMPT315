import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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
          label="Drop-off date"
          inputFormat="MM/DD/YYYY"
          disablePast
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
