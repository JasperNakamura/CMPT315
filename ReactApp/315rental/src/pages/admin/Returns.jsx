import { Box, Button, Card, CssBaseline, Grid, Paper, TextField } from '@mui/material'
import { Container } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from "react";
import Header from "../../components/AdminHeader"
import axios from 'axios';
import moment from 'moment';
import DateReturn from '../../components/DateReturnedSelector';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

export default function Returns() {
  
  const handleReturnDate = (event) => {
  console.log(moment(event).format("YYYY-MM-DD"))
  setReturnDate(moment(event).format("YYYY-MM-DD"))
  }





  /*
  This function is an on click event that appends to the rental   
  */
  function rentalEmployee() {
   
    console.log(selectedRow);
    //check if date is selected 
    if (returnDate === null) {handleNoDate()}
    //check if selectedRow array is empty or not
    else if (selectedRow === null || selectedRow.length === 0) {handleInvalid()}

    //if array is not empty, begin calculating total cost

    //grab car's total cost
    /**
     * 1. grab car's (id or name) from API and grab car's cost      ()
     * 2. grab return date and check if return date is less than expected return date 
     *      -test: $5 late fee for day between expected return date and returned date
     * 3. 
     */

    else {
      //var dateToReturn = DateReturn.value;
      var isLate = false;
      const DAY_IN_WEEK = 7;
      const WEEK_IN_MONTH = 4;
      const DAY = 1000 * 60 * 60 * 24;
      //initialize cost
      var cost = 0.0;

      var carType = selectedRow[0].carType;
      //find matching car type here:
      var match = cartypes.find((type) => type.CarType === carType);
      //get daily cost, weekly cost, monthly cost here:
      var dailyCost = parseFloat(match.DailyCost);
      var weeklyCost = parseFloat(match.WeeklyCost);
      var monthlyCost = parseFloat(match.MonthlyCost);
      var lateFee = parseFloat(match.LateFee);

      //get expected return date
      var dateTo = selectedRow[0].to;
      var dateFrom = selectedRow[0].from;
      var newDateFrom = dateFrom.split('-').join('/');
      var newReturnDate = returnDate.split('-').join('/');
      var newDateTo = dateTo.split('-').join('/');
    
      newDateFrom = new Date(newDateFrom);
      newReturnDate = new Date(newReturnDate);
      newDateTo = new Date(newDateTo);
     
      //check if inputted return date is greater than expected return date:
      if (newDateTo < newReturnDate){
        console.log("late!");
        isLate = true;
      }

      //calculate first the difference between days from dateTo to dateFrom
      var diffDays = Math.round((newDateTo - newDateFrom) / DAY);

      //check if diffDays is less than 7; if it is, then calculate daily costs:
      if (diffDays <= DAY_IN_WEEK){
        cost += diffDays * dailyCost;
      }
      else{
        var numWeeks = Math.floor(diffDays/DAY_IN_WEEK);
        console.log(numWeeks);
        //if number of weeks is greater than weeks in a month, calculate monthly costs
        if (numWeeks > WEEK_IN_MONTH){
          var numMonths = Math.floor(numWeeks/DAY_IN_WEEK);
          cost += numMonths * monthlyCost;
        }
        else {
          console.log(numWeeks);
          console.log(weeklyCost);
          cost += numWeeks * weeklyCost;
          
        }
      }

      //check if returned car is late:
      if (isLate){
        cost += lateFee;
      }

      console.log(currencyFormat(cost));


      handleSuccess();

      //get element of textbox where total cost is located:
      const elem = document.getElementById('mileage_input_id');
      elem.value = currencyFormat(cost);

    }
    

  }


  /* From StackOverflow */
  function currencyFormat(num) {
    if (num != null) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    else {
        return null
    }
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

  //states:
  const [noDate, setNoDate] = useState(false);
  const [invalid,setInvalid] = useState(false);        // boolean states that are required to show alert box if user didn't select anything in datagrid
  const [success,setSuccess] = useState(false);        // boolean states that shows alert box if user successfully sets cost and return date
  const [selectedRow,setSelectedRow] = useState(null); // grab the rental row's information to be processed
  const [returnDate,setReturnDate] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [cars, setCars] = useState([]);
  const [cartypes, setCartypes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  
  const handleNoDate = () => {
    setNoDate(!noDate);
  }

  const handleInvalid = () => {
    setInvalid(!invalid);
  }

  const handleSuccess = () => {
    setSuccess(!success);
  }


  const getRentals = async () => {
    axios.get(`http://127.0.0.1:8000/api/rentals/?format=json`)
        .then(response => {
          let filtered = response.data.filter(a => a.DateReturned == null && a.TotalCost == null && a.Employee != null)
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

  return (
    <Box sx={{backgroundColor: '#21033a', minHeight: '100vh', paddingBottom: '5em'}}>
      <CssBaseline/>
      <Header/>
      <Container>
        <h1 style={{color: 'white'}}>Manage Returns</h1>
        {/* Table */}
        <Box maxWidth="sx" sx={{border: '1px solid grey', borderRadius: '1em', padding: '1em', margin: '1em', backgroundColor: '#fff'}}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid 
                  rows={rows} 
                  columns={columns}
                  
                  /*Once user selects a row in DataGrid, save the row to an array*/

                  onSelectionModelChange={(item) => {
                    
                      const selectedItem = new Set(item);
                      
                      const selectedItemData = rows.filter((row) => selectedItem.has(row.id));
                      setSelectedRow(selectedItemData);
                      
                      
                  }}
                  
                  />
              </Box>
          </Paper>
        </Box>
      </Container>

      <Container>
        <Card sx={{padding: '2em'}}>
          <h2>Enter Return Values</h2>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            
            <Box>
              <TextField
                sx={{m: 2}}
                required
                number
                name="mileage_add"
                id="mileage_input_id"
                label="Total Cost"
              />
            </Box>
            <Box>
              <DateReturn onChange={value => handleReturnDate(value)} value={returnDate}/>
            </Box>
          </Box>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={3}>
                <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} 
                variant="contained"
                name="button_add" 
                onClick={rentalEmployee}>
                  Set Cost & Return Date
              </Button>
            </Grid>   
          </Grid> 
        </Card>
      </Container> 
      {/*Dialog shows when user doesn't select anything*/} 
      <Dialog open={noDate} onClose={handleNoDate}>
        <Alert
          severity="warning"
          color="error"
          
          icon={<AccessAlarmIcon />}
          onClose={() => {}}
          closeText="Doesn't Work!"
          sx={{
            // width: '80%',
            // margin: 'auto',
            "& .MuiAlert-icon": {
              color: "blue"
            }
            //backgroundColor: "green"
          }}
        >
          <AlertTitle>No date is selected!</AlertTitle>
          Please select a return date.
        </Alert>
      </Dialog>
      {/*Dialog shows when user doesn't select anything*/} 
      <Dialog open={invalid} onClose={handleInvalid}>
        <Alert
          severity="warning"
          color="error"
          
          icon={<AccessAlarmIcon />}
          onClose={() => {}}
          closeText="Doesn't Work!"
          sx={{
            // width: '80%',
            // margin: 'auto',
            "& .MuiAlert-icon": {
              color: "blue"
            }
            //backgroundColor: "green"
          }}
        >
          <AlertTitle>No car is selected!</AlertTitle>
          Please select a car to be returned.
        </Alert>
      </Dialog>
      {/*Dialog shows when user successfully returns rental*/}
      <Dialog open={success} onClose={handleSuccess}>
      <Alert
        severity="success"
        
        
      
        onClose={() => {}}
        closeText="Doesn't Work!"
        sx={{
          // width: '80%',
          // margin: 'auto',
          "& .MuiAlert-icon": {
            color: "blue"
          }
          //backgroundColor: "green"
        }}
      >
        <AlertTitle>Success!</AlertTitle>
        You've successfully returned the item.
      </Alert>
    </Dialog>

    </Box> 
    

  )
}
