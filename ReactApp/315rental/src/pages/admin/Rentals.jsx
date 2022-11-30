import { Box, Button, Card, CssBaseline, Grid, Paper, TextField } from '@mui/material'
import { Container } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import Header from "../../components/AdminHeader"
import axios from 'axios';

export default function Rentals() {
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
              let filtered = response.data.filter(a => a.DateReturned == null)
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

  /* Update with Employee ID  */
  /* HANDLES ROW SELECT. WHEN ROW SELECTED FILL INFO BELOW */
  const [rentalInfo, setRentalInfo] = React.useState("");

  function onSelect(rentalInfo) {
    if (rentalInfo != null) {
      setRentalInfo(rentalInfo);
    }
  }

  const [employeeID, setEmployeeID] = React.useState("");

  const rentalEmployee = async (event) => {
    event.preventDefault();
    
    await axios.put(`http://127.0.0.1:8000/api/rentals/${rentalInfo.id}`, {
      DateFrom: "2022-10-23", 
      DateTo: "2022-10-29",
      DateReturned: null,
      TotalCost: '65.0',
      LicensePlate: "HKV-5937",
      GoldMember: true,
      Customer: '2',
      Employee: '2',
      BranchFrom: '1', 
      BranchTo: 1,
      Car: 3,
      CarType: 2,
    })
    .then(res => {
      console.log(res);
    }) 
    .catch(err => console.log(err));
  }

  const handleChange = (event) => {
    if (event.target.id === "set_employee_input_id") {
      setEmployeeID(event.target.value);
    }
  }

  return (
    <Box sx={{backgroundColor: '#21033a', minHeight: '100vh'}}>
      <CssBaseline/>
      <Header/>
      <Container>
        <h1 style={{color: 'white'}}>Manage Rentals</h1>
        {/* Table */}
        <Box maxWidth="sx" sx={{border: '1px solid grey', borderRadius: '1em', padding: '1em', margin: '1em', backgroundColor: '#fff'}}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid rows={rows} columns={columns} onRowClick={(rowData)=> onSelect(rowData.row)}/>
              </Box>
          </Paper>
        </Box>
      </Container>

      <Container>
        <Card sx={{padding: '2em'}}>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Box>
              <h2>Which Employee will handle the Rental?</h2>
              <select
                  required
                  name="set_employee"
                  id="set_employee_input_id"
                  onChange={handleChange}
              >
                <option disabled selected value> ー Select Employee* ー </option>
                {employees.map((name, index) => {
                    return <option key={index} value={name.ID}>{name.FirstName} {name.LastName}</option>
                })}
              </select>
            </Box>
          </Box>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={3}>
                <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} 
                variant="contained"
                name="button_add" 
                onClick={rentalEmployee}>
                  Set Employee
              </Button>
            </Grid>   
          </Grid> 
        </Card>
      </Container>
    </Box>
  )
}
