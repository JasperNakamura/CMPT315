import { Box, Button, Card, TextField } from '@mui/material'
import React, { useEffect, useState } from "react";
import { Grid, Link, Paper } from "@mui/material";
import Header from "../../components/AdminHeader"
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import axios from 'axios';

export default function Home() {
    /* From StackOverflow */
    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    /* MUI DataTable */
    const columns = [
        { field: 'from', headerName: 'DateFrom', width: 100},
        { field: 'to', headerName: 'DateTo', width: 100},
        { field: 'returned', headerName: 'DateReturned', width: 110},
        { field: 'totalcost', headerName: 'Total Cost', width: 150},
        { field: 'license', headerName: 'License', width: 100},
        { field: 'gold', headerName: 'Gold Member', width: 110},
        { field: 'customer', headerName: 'Customer', width: 150},
        { field: 'employee', headerName: 'Employee', width: 150},
        { field: 'branchfrom', headerName: 'Branch From', width: 150},
        { field: 'branchto', headerName: 'Branch To', width: 150},
        { field: 'car', headerName: 'Car', width: 250},
        { field: 'cartype', headerName: 'Car Type', width: 150},
    ];

    const rows = [];
  
    /* Rental table data template */
    function createData(id, from, to, returned, totalcost, license, gold, customer, employee, branchfrom, branchto, car, cartype) {
        return {id, from, to, returned, totalcost, license, gold, customer, employee, branchfrom, branchto, car, cartype};
    }

    /* Get Rentals */
    let config = {
        headers: {
            GoldMember: true,
        }
    }

    const [rentals, setRentals] = useState([]);
    const [cars, setCars] = useState([]);
    const [cartypes, setCartypes] = useState([]);
    const [branches, setBranches] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);

    const getRentals = async () => {
        axios.get(`http://127.0.0.1:8000/api/rentals/?format=json`)
            .then(response => {
                let filtered = response.data.filter(a => a.DateReturned != null && a.TotalCost != null)
                setRentals(filtered);
            }).catch(error => {
                console.log(error);
        })  
    }

    const getCars = async () => {
        axios.get(`http://127.0.0.1:8000/api/cars/?format=json`)
            .then(response => {
                setCars(response.data);
            }).catch(error => {
                console.log(error);
        })  
    }

    const getCarTypes = async () => {
        axios.get(`http://127.0.0.1:8000/api/carTypes/?format=json`)
            .then(response => {
                setCartypes(response.data);
            }).catch(error => {
                console.log(error);
        })  
    }

    const getBranches = async () => {
        axios.get(`http://127.0.0.1:8000/api/branches/?format=json`)
            .then(response => {
                setBranches(response.data);
            }).catch(error => {
                console.log(error);
        })  
    }

    const getEmployees = async () => {
        axios.get(`http://127.0.0.1:8000/api/employees/?format=json`)
            .then(response => {
                setEmployees(response.data);
            }).catch(error => {
                console.log(error);
        })  
    }

    const getCustomers = async () => {
        axios.get(`http://127.0.0.1:8000/api/customers/?format=json`)
            .then(response => {
                setCustomers(response.data);
            }).catch(error => {
                console.log(error);
        })  
    }

    useEffect(() => {
        getRentals();
        getCars();
        getCarTypes();
        getBranches();
        getEmployees();
        getCustomers();
    }, []);

    function getCar(car) {
        for (let index in cars) {
            if (cars[index].CarID == car) {
                return cars[index].Colour + ' ' + cars[index].Manufacturer + ' ' + cars[index].Model + ' (' + cars[index].LicensePlate + ')'
            }
        }   
    }

    function getCartype(type) {
        for (let index in cartypes) {
            if (cartypes[index].TypeID == type) {
                return cartypes[index].Description
            }
        }
    }

    function getCustomer(person) {
        for (let index in customers) {
            if (customers[index].ID == person) {
                return customers[index].FirstName + ' ' + customers[index].LastName
            }
        }
    }

    function getEmployee(person) {
        for (let index in employees) {
            if (employees[index].ID == person) {
                return employees[index].FirstName + ' ' + employees[index].LastName
            }
        }
    }

    function getBranch(place) {
        for (let index in branches) {
            if (branches[index].BranchID == place) {
                return branches[index].City + ', ' + branches[index].Province
            }
        }
    }

    for (let rent in rentals) {
        rows.push(createData(rentals[rent].RentalID, rentals[rent].DateFrom, rentals[rent].DateTo, rentals[rent].DateReturned, currencyFormat(rentals[rent].TotalCost), rentals[rent].LicensePlate, rentals[rent].GoldMember, getCustomer(rentals[rent].Customer), getEmployee(rentals[rent].Employee), getBranch(rentals[rent].BranchFrom), getBranch(rentals[rent].BranchTo), getCar(rentals[rent].Car), getCartype(rentals[rent].CarType)));
    }

    /* Add Branch */
    /* Input field values */
    const [phonenum, setPhonenum] = React.useState("");
    const [province, setProvince] = React.useState("");
    const [city, setCity] = React.useState("");
    const [postal, setPostal] = React.useState("");
    const [streetnum, setStreetnum] = React.useState("");
    const [streetname, setStreetname] = React.useState("");
    const [unit, setUnit] = React.useState("");

    const handleChange = (event) => {
        if(event.target.id === "phone_input_id"){
            setPhonenum(event.target.value);
        }
        if(event.target.id === "province_input_id"){
            setProvince(event.target.value);          
        }
        if(event.target.id === "city_input_id"){
            setCity(event.target.value);        
        }
        if(event.target.id === "postal_input_id"){
            setPostal(event.target.value);
        }
        if(event.target.id === "streetnum_input_id"){
            setStreetnum(event.target.value);
        }
        if(event.target.id === "streetname_input_id"){
            setStreetname(event.target.value);
        }
        if(event.target.id === "unit_input_id") {
            setUnit(event.target.value);
        }
    };

    const handleAdd = async (event) => {
        event.preventDefault();
    
        await axios.post('http://127.0.0.1:8000/api/branches/', {
          PhoneNum: phonenum, 
          Province: province,
          City: city,
          PostalCode: postal,
          StreetNumber: streetnum,
          StreetName: streetnum,
          UnitNumber: unit,
        })
        .then(res => console.log(res)) 
        .catch(err => console.log(err));
    }

    return (
        <Box sx={{height: '100%', backgroundColor: '#21033a', paddingBottom: '5em'}}>
            <Header/>

            {/* Table */}
            <Box maxWidth="sx" sx={{border: '1px solid grey', borderRadius: '1em', padding: '1em', margin: '1em', backgroundColor: '#fff'}}>
                <h1>Returned Rentals</h1>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} />
                    </Box>
                </Paper>
            </Box>
            {/* Create Branch */}
            <Container>
                <Card sx={{padding: '2em'}}>
                    <h1>Add Branch</h1>
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <TextField                          
                            sx={{m: 2}}
                            required
                            name="phone_add"
                            id="phone_input_id"
                            label="Phone Number"                  
                            value={phonenum}
                            onChange={handleChange}
                            inputProps={{ maxLength: 12 }}
                        />

                        <TextField                          
                            sx={{m: 2}}
                            required
                            name="province_add"
                            id="province_input_id"
                            label="Province"                  
                            value={province}
                            onChange={handleChange}
                        />

                        <TextField                          
                            sx={{m: 2}}
                            required
                            name="city_add"
                            id="city_input_id"
                            label="City"                  
                            value={city}
                            onChange={handleChange}
                        />

                        <TextField                          
                            sx={{m: 2}}
                            required
                            name="postal_add"
                            id="postal_input_id"
                            label="Postal Code"                  
                            value={postal}
                            onChange={handleChange}
                            inputProps={{ maxLength: 6 }}
                        />

                        <TextField                          
                            sx={{m: 2}}
                            required
                            name="streetnum_add"
                            id="streetnum_input_id"
                            label="Street Number"                  
                            value={streetnum}
                            type="number"
                            inputProps={{ maxLength: 6 }}
                            onChange={handleChange}
                        />

                        <TextField                          
                            sx={{m: 2}}
                            required
                            name="streetname_add"
                            id="streetname_input_id"
                            label="Street Name"                  
                            value={streetname}
                            onChange={handleChange}
                        />

                        <TextField                          
                            sx={{m: 2}}
                            required
                            name="unit_add"
                            id="unit_input_id"
                            label="Unit Number"
                            type="number"                  
                            value={unit}
                            onChange={handleChange}
                        />

                        <Grid container spacing={0} justifyContent="center">
                            <Grid item xs={3}>
                                <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} 
                                variant="contained"
                                name="button_add" 
                                onClick={handleAdd}>
                                    Add Branch
                                </Button>
                            </Grid>   
                        </Grid> 
                    </Box>
                </Card>
            </Container>
        </Box>
    )
}
