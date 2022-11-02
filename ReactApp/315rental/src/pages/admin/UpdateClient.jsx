import * as React from 'react';
import moment from 'moment';
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function UpdateClient () {
    const [value, setValue] = React.useState(moment('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        /* add changes later */
        setValue(newValue);
    };

    return (
        <div>
            <Header/>
            <Container>
                <h1>Update Client Information</h1>
            </Container>

            <Container>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="DOB"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Container>

            <Container>
                <TextField
                    required
                    id="outlined-first"
                    label="FirstName"
                    type="number"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-last"
                    label="LastName"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-license"
                    label="DriversLicense"
                    type="number"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-email"
                    label="Email"
                    type="email"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-phone"
                    label="PhoneNum"
                    type="tel"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-province"
                    label="Province"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-first"
                    label="City"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-postal"
                    label="PostalCode"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-streetnum"
                    label="StreetNumber"
                    type="number"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-streetname"
                    label="StreetName"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-unit"
                    label="UnitNumber"
                    type="number"
                />


                <FormControlLabel control={<Switch/>} label="GoldMember" labelPlacement='start' />

                
                <Button variant="contained">Submit</Button>    
            </Container>
        </div>
    );
}