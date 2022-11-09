import * as React from 'react';
import moment from 'moment';
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, unstable_composeClasses } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function RentCar () {
    const [from, setFrom] = React.useState(moment('2014-08-18T21:11:54'));
    const [to, setTo] = React.useState(moment('2014-08-18T21:11:54'));
    const [returned, setReturned] = React.useState(moment('2014-08-18T21:11:54'));

    const [totalCost, setTotalCost] = React.useState('');
    const [licencePlate, setLicencePlate] = React.useState('');
    const [goldMember, setGoldMember] = React.useState(false);

    const [customer, setCustomer] = React.useState('');
    const [employee, setEmployee] = React.useState('');
    const [branchfrom, setBranchfrom] = React.useState('');
    const [branchto, setBranchto] = React.useState('');
    const [car, setCar] = React.useState('');
    const [cartype, setCartype] = React.useState('');

    const handleChange = (event) => {
        /* Add handle changes later */
        if(event.target.id === "manufacturer_input_id"){
            setFrom(event.target.value);
        }
        if(event.target.id === "manufacturer_input_id"){
            setTo(event.target.value);
        }
        if(event.target.id === "manufacturer_input_id"){
            setReturned(event.target.value);
        }

        if(event.target.id === "totalCost_id"){
            setTotalCost(event.target.value);
        }
        if(event.target.id === "licencePlate_id"){
            setLicencePlate(event.target.value);
        }
        if(event.target.id === "goldMember_input_id"){
            
            setGoldMember(!event.target.checked);
        }
        
        if(event.target.id === "customer_select_id"){
            setCustomer(event.target.value);
        }
        if(event.target.id === "employee_select_id"){
            setEmployee(event.target.value);          
        }
        if(event.target.id === "branchfrom_select_id"){
            setBranchfrom(event.target.value);        
        }
        if(event.target.id === "branchto_select_id"){
            setBranchto(event.target.value);
        }
        if(event.target.id === "car_select_id"){
            setCar(event.target.value);
        }
        if(event.target.id === "cartype_select_id"){
            setCartype(event.target.value);
        }
        /*setFrom(newValue);*/
        
    };

    const handleSubmit = (event) =>{
        event.preventDefault();

        const fromValue = from;
        const toValue = to;
        const returnValue = returned;

        const totalCostValue = totalCost;
        const licencePlateValue = licencePlate;
        const goldMemberValue = goldMember;
        const customerValue = customer;
        const employeeValue = employee;
        const branchfromValue = branchfrom;
        const branchtoValue = branchto;
        const carValue = car;
        const carTypeValue = cartype;
       
    }

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
                    id="dateFrom_id"
                    inputFormat="MM/DD/YYYY"
                    value={from}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="DateTo"
                    id="dateTo_id"
                    inputFormat="MM/DD/YYYY"
                    value={to}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="DateReturned"
                    id="dateReturn_id"
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
                    id="totalCost_id"
                    label="TotalCost"
                    type="number"
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="licencePlate_id"
                    label="LicensePlate"
                    onChange={handleChange}
                    /* inputRef={} */
                />

                <FormControlLabel control={<Switch id="goldMember_input_id"/>} label="GoldMember" labelPlacement='start' defaultChecked={false} onChange={handleChange} value={goldMember}/>

                <InputLabel id="customer-simple-select-label">Customer</InputLabel>
                <Select
                labelId="customer-simple-select-label"
                id="customer_select_id"
                value={customer}
                label="Customer"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="employee-simple-select-label">Employee</InputLabel>
                <Select
                labelId="employee-simple-select-label"
                id="employee_select_id"
                value={employee}
                label="Employee"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="branchfrom-simple-select-label">BranchFrom</InputLabel>
                <Select
                labelId="branchfrom-simple-select-label"
                id="branchfrom_select_id"
                value={branchfrom}
                label="BranchFrom"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="branch-simple-select-label">BranchTo</InputLabel>
                <Select
                labelId="branchto-simple-select-label"
                id="branchto_select_id"
                value={branchto}
                label="BranchTo"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="car-simple-select-label">Car</InputLabel>
                <Select
                labelId="car-simple-select-label"
                id="car_select_id"
                value={car}
                label="Car"
                onChange={handleChange}
                >
                </Select>

                <InputLabel id="cartype-simple-select-label">Car Type</InputLabel>
                <Select
                labelId="cartype-simple-select-label"
                id="cartype_select_id"
                value={cartype}
                label="CarType"
                onChange={handleChange}
                >
                </Select>  
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>    
            </Container>
        </div>
    );
}