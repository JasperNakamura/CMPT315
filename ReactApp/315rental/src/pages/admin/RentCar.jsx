import * as React from 'react';
import moment from 'moment';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, unstable_composeClasses } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect } from 'react';
import axios from 'axios';

export default function RentCar () {
    const [from, setFrom] = React.useState(moment('2014-08-18T21:11:54'));
    const [to, setTo] = React.useState(moment('2014-08-18T21:11:54'));
    const [returned, setReturned] = React.useState(moment('2014-08-18T21:11:54'));

    const [totalCost, setTotalCost] = React.useState(0.0);
    const [licencePlate, setLicencePlate] = React.useState('');
    const [goldMember, setGoldMember] = React.useState(false);
    const [customer, setCustomer] = React.useState(0);
    const [employee, setEmployee] = React.useState(0);
    const [branchfrom, setBranchfrom] = React.useState(0);
    const [branchto, setBranchto] = React.useState(0);
    const [car, setCar] = React.useState(0);
    const [cartype, setCartype] = React.useState(0);

    const [customers, setCustomers] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [branches, setBranches] = React.useState([]);
    const [cars, setCars] = React.useState([]);

    /* Customer API */
    const getCustomers = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/customers/?format=json`)
          if (response.length > 0 || response.data !== undefined) {
            setCustomers(response.data);
          }
        } catch (error) {
            console.log(error);
        }  
    }

    /* Employee API */
    const getEmployees = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/employees/?format=json`)
          if (response.length > 0 || response.data !== undefined) {
            setEmployees(response.data);
          }
        } catch (error) {
            console.log(error);
        }  
    }
    
    /* Branch API */
    const getBranches = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/branches/?format=json`)
          if (response.length > 0 || response.data !== undefined) {
            setBranches(response.data);
          }
        } catch (error) {
            console.log(error);
        }  
    }

    /* Car API */
    const getCars = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/cars/?format=json`)
            if (response.length > 0 || response.data !== undefined) {
            setCars(response.data);
            }
        } catch (error) {
            console.log(error);
        }  
    }

    useEffect(() => {
        getCustomers();
        getEmployees();
        getBranches();
        getCars();
    }, []);


    const handleChange = async (event) => {
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
            setTotalCost(parseFloat(event.target.value));
        }
        // if(event.target.id === "licencePlate_id"){
        //     setLicencePlate(event.target.value);
        // }
        // if(event.target.id === "goldMember_input_id"){   
        //     setGoldMember(!event.target.checked);
        // }
        if(event.target.id === "customer_select_id"){
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/customers/${event.target.value}/?format=json`)
                if (response.length > 0 || response.data !== undefined) {
                let person = response.data;
                setCustomer(parseInt(person.ID));
                setGoldMember(person.GoldMember);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(event.target.id === "employee_select_id"){
            setEmployee(parseInt(event.target.value));          
        }
        if(event.target.id === "branchfrom_select_id"){
            setBranchfrom(parseInt(event.target.value));        
        }
        if(event.target.id === "branchto_select_id"){
            setBranchto(parseInt(event.target.value));
        }
        if(event.target.id === "car_select_id"){
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/cars/${event.target.value}/?format=json`)
                if (response.length > 0 || response.data !== undefined) {
                let vehicle = response.data;
                console.log(vehicle);
                setCar(parseInt(vehicle.CarID));
                setCartype(parseInt(vehicle.Type));
                setLicencePlate(vehicle.LicencePlate);
                }
            } catch (error) {
                console.log(error);
            }
        }
        // if(event.target.id === "cartype_select_id"){
        //     setCartype(event.target.value);
        // }
        /*setFrom(newValue);*/
        
    };

    const handleSubmit = async (event) =>{
        event.preventDefault();
        await axios.post('http://localhost:8000/api/rentals/', {
            DateFrom: "2014-08-18",
            DateTo: "2014-08-18",
            DateReturned: "2014-08-18",
            TotalCost: 420.69,
            LicencePlate: "ABC-123",
            GoldMember: false,
            Customer: 2,
            Employee: 2,
            BranchFrom: 1,
            BranchTo: 1,
            Car: 2,
            CarType: 3,
        })
        .then(res => console.log(res)) 
        .catch(err => console.log(err));
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
                {/* <TextField
                    required
                    id="licencePlate_id"
                    label="LicensePlate"
                    onChange={handleChange}
                    /* inputRef={} */}
                {/*/> */}

                {/* <FormControlLabel control={<Switch id="goldMember_input_id"/>} label="GoldMember" labelPlacement='start' defaultChecked={false} onChange={handleChange} value={goldMember}/> */}

                <InputLabel id="customer-simple-select-label">Customer</InputLabel>
                <select
                    required
                    name="customer"
                    id="customer_select_id"
                    onChange={handleChange}
                >
                    <option disabled selected value> ー Select Customer* ー </option>
                    {customers.map((person, index) => {
                        return <option key={index} value={person.ID}>{person.LastName}, {person.FirstName}</option>
                    })}
                </select>

                <InputLabel id="employee-simple-select-label">Employee</InputLabel>
                <select
                    required
                    name="employee"
                    id="employee_select_id"
                    onChange={handleChange}
                >
                    <option disabled selected value> ー Select Employee* ー </option>
                    {employees.map((person, index) => {
                        return <option key={index} value={person.ID}>{person.LastName}, {person.FirstName}</option>
                    })}
                </select>

                <InputLabel id="branchfrom-simple-select-label">BranchFrom</InputLabel>
                <select
                    required
                    name="branchfrom"
                    id="branchfrom_select_id"
                    onChange={handleChange}
                >
                    <option disabled selected value> ー Select Branch Location* ー </option>
                    {branches.map((location, index) => {
                        return <option key={index} value={location.BranchID}>{location.City}</option>
                    })}
                </select>

                <InputLabel id="branchto-simple-select-label">BranchTo</InputLabel>
                <select
                    required
                    name="branchto"
                    id="branchto_select_id"
                    onChange={handleChange}
                >
                    <option disabled selected value> ー Select Branch Location* ー </option>
                    {branches.map((location, index) => {
                        return <option key={index} value={location.BranchID}>{location.City}</option>
                    })}
                </select>

                <InputLabel id="car-simple-select-label">Car</InputLabel>
                <select
                    required
                    name="car"
                    id="car_select_id"
                    onChange={handleChange}
                >
                    <option disabled selected value> ー Select Vehicle* ー </option>
                    {cars.map((vehicle, index) => {
                        return <option key={index} value={vehicle.CarID}>{vehicle.Colour} {vehicle.Manufacturer} {vehicle.Model} ({vehicle.LicencePlate})</option>
                    })}
                </select>

                {/* <InputLabel id="cartype-simple-select-label">Car Type</InputLabel>
                <Select
                labelId="cartype-simple-select-label"
                id="cartype_select_id"
                value={cartype}
                label="CarType"
                onChange={handleChange}
                >
                </Select>   */}
                <Grid container spacing={0} justifyContent="center">
                    <Grid item xs={3}>
                        <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>   
                </Grid>     
            </Container>
        </div>
    );
}