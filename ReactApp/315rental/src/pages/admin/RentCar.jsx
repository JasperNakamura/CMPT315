import * as React from 'react';
import moment from 'moment';
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function RentCar () {
    const [from, setFrom] = React.useState(moment('2014-08-18T21:11:54'));
    const [to, setTo] = React.useState(moment('2014-08-18T21:11:54'));
    const [returned, setReturned] = React.useState(moment('2014-08-18T21:11:54'));

    const [customer, setCustomer] = React.useState('');
    const [employee, setEmployee] = React.useState('');
    const [branchfrom, setBranchfrom] = React.useState('');
    const [branchto, setBranchto] = React.useState('');
    const [car, setCar] = React.useState('');
    const [cartype, setCartype] = React.useState('');

    const handleChange = (newValue) => {
        /* Add handle changes later */
        setFrom(newValue);
    };

    return (
        <div>
            <Header/>
            <Container>
                <h1>Setup Rental for Client</h1>
            </Container>

            <Container>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="DateFrom"
                    inputFormat="MM/DD/YYYY"
                    value={from}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="DateTo"
                    inputFormat="MM/DD/YYYY"
                    value={to}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="DateReturned"
                    inputFormat="MM/DD/YYYY"
                    value={returned}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Container>

            <Container>
                <TextField
                    required
                    id="outlined-totalcost"
                    label="TotalCost"
                    type="number"
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="outlined-licenseplate"
                    label="LicensePlate"
                    /* inputRef={} */
                />

                <FormControlLabel control={<Switch/>} label="GoldMember" labelPlacement='start' />

                <InputLabel id="customer-simple-select-label">Customer</InputLabel>
                <Select
                labelId="customer-simple-select-label"
                id="customer-simple-select"
                value={customer}
                label="Customer"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="employee-simple-select-label">Employee</InputLabel>
                <Select
                labelId="employee-simple-select-label"
                id="employee-simple-select"
                value={employee}
                label="Employee"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="branchfrom-simple-select-label">BranchFrom</InputLabel>
                <Select
                labelId="branchfrom-simple-select-label"
                id="branchfrom-simple-select"
                value={branchfrom}
                label="BranchFrom"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="branch-simple-select-label">BranchTo</InputLabel>
                <Select
                labelId="branchto-simple-select-label"
                id="branchto-simple-select"
                value={branchto}
                label="BranchTo"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="car-simple-select-label">Car</InputLabel>
                <Select
                labelId="car-simple-select-label"
                id="car-simple-select"
                value={car}
                label="Car"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="cartype-simple-select-label">Car Type</InputLabel>
                <Select
                labelId="cartype-simple-select-label"
                id="cartype-simple-select"
                value={cartype}
                label="CarType"
                onChange={handleChange}
                >
                </Select>  
                <Button variant="contained">Submit</Button>    
            </Container>
        </div>
    );
}