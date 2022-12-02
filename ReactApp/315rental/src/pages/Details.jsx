import Header from "../components/Header";
import Footer from "../components/Footer";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, CssBaseline, Divider, Grid, IconButton, Modal, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Container } from "@mui/system";
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

// Changes color to a reddish color
const theme = createTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    }
  }
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '1em',
  boxShadow: 24,
  p: 4,
};

export default function Details() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();
  /*data passed from cars*/
  const [carDetails, setCarDetail] = useState(location.state.CarDetails)
  const [dropOffDate, setDropOffDate] = useState(location.state.DropOffDate)
  const [dropOffLocation, setDropOffLocation] = useState(location.state.DropOffLocation)
  const [pickUpDate, setPickUpDate] = useState(location.state.PickUpDate)
  const [pickUpLocation, setPickUpLocation] = useState(location.state.PickUpLocation)

  /*handle date */
  const pickUp = new Date(pickUpDate);
  const dropOff = new Date(dropOffDate);
  const diffTime = Math.abs(dropOff - pickUp);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  /* API Arrays */
  const [carType, setCarType] = React.useState([]);

  /* Branch API */
  const getCarTypes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/carTypes/?format=json`
        + "&TypeID=" + carDetails.Type)
        .then(response => {
          setCarType(response.data);
          console.log(carType)
        }).catch(error => {

        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCarTypes()
  }, []);

  /*Prices detail*/
  const [normalFees, setNormalFees] = React.useState(0);
  const [totalFees, setTotalFees] = React.useState(0);
  const [fees, setFees] = React.useState(0);
  const [gst, setGST] = React.useState(null);
  const [pst, setPST] = React.useState(null);
  const [hst, setHST] = React.useState(null);
  
  let GST = {
    Alberta: 5,
    Ontario: 0,
    Newfoundland: 0,
    PrinceEdwardIsland: 0,
    NovaScotia: 0,
    NewBrunswick: 0,
    Quebec: 5,
    Manitoba: 5,
    Saskatchewan: 5,
    BritishColumbia: 5,
    Yukon: 5,
    NorthwestTerritories: 5,
    Nunavut: 5
  }

  let PST = {
    Alberta: 0,
    Ontario: 0,
    Newfoundland: 0,
    PrinceEdwardIsland: 0,
    NovaScotia: 0,
    NewBrunswick: 0,
    Quebec: 9.975,
    Manitoba: 7,
    Saskatchewan: 6,
    BritishColumbia: 7,
    Yukon: 0,
    NorthwestTerritories: 0,
    Nunavut: 0
  }

  let HST = {
    Alberta: 0,
    Ontario: 13,
    Newfoundland: 15,
    PrinceEdwardIsland: 15,
    NovaScotia: 15,
    NewBrunswick: 15,
    Quebec: 0,
    Manitoba: 0,
    Saskatchewan: 0,
    BritishColumbia: 0,
    Yukon: 0,
    NorthwestTerritories: 0,
    Nunavut: 0
  }

  function calculateFees() {
    let temp = 10 * diffDays
    setFees(temp)
    setTotalFees(normalFees + temp)
  }

  function removeFees() {
    setFees(0)
    setTotalFees(normalFees)
  }

  function calculateTax(taxValue, currentValue) {
    let temp = (taxValue / 100) * currentValue
    return temp
  }

  return (
    <Box bgcolor='#21033a'>
      {/* MUI's CSS Normalize */}
      <CssBaseline />
      {/*Header section from component*/}
      <Header />

      {/*Box Container is MUI standard convention for styling*/}
      <Box>
        <Container>
          <ThemeProvider theme={theme}>
            <Box sx={{ fontSize: 'h5.fontSize', fontWeight: 'bold', color: 'white' }} mb={1} mt={1}>
              <IconButton aria-label="back" color="primary" href="cars" to="/cars">
                <ArrowBackIcon />
              </IconButton>
              See all cars
            </Box>
          </ThemeProvider>

          <Divider />

          <Grid container spacing={2}>
            {/* Filter section */}
            <Grid item xs={8}>
              <Card style={{ padding: '2em', marginBottom: '2em' }}>
                <div>
                  <h2>{carDetails.Manufacturer} {carDetails.Model} (LicensePlate: {carDetails.LicensePlate})</h2>
                  <h4>Color: {carDetails.Colour}</h4>
                  <h4>FuelType: {carDetails.FuelType}</h4>
                  <h4>Mileage: {carDetails.Mileage}</h4>
                </div>
              </Card>

              {/* Free Cancellation */}
              <Card style={{ padding: '2em', marginBottom: '2em' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarMonthIcon sx={{ fontSize: 60 }} />
                  <Box>
                    <b>Free cancellation</b><br />
                    Lock in this price today, cancel free of charge anytime. Reserve now and pay at pick-up.
                  </Box>
                </Box>
              </Card>

              {/* NEEDS CAR RENTAL LOCATIONS FOR DROP OFF AND PICKUP */}
              <Card style={{ padding: '2em', marginBottom: '2em' }}>
                <h2>Car Rental Location</h2>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <b>Pick-up Location</b>
                    <p><b>Phone Number: </b>{pickUpLocation.PhoneNum}</p>
                    <p><b>Address: </b> &emsp; &emsp;&emsp;{pickUpLocation.UnitNumber}, {pickUpLocation.StreetNumber} {pickUpLocation.StreetName.toUpperCase()}</p>
                    <p>&emsp; &emsp; &emsp; &emsp; &emsp;&emsp;&ensp;&nbsp;{pickUpLocation.City} {pickUpLocation.Province} {pickUpLocation.PostalCode}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <b>Drop-off Location</b>
                    <p><b>Phone Number: </b>{dropOffLocation.PhoneNum}</p>
                    <p><b>Address: </b> &emsp; &emsp;&emsp;{dropOffLocation.UnitNumber}, {dropOffLocation.StreetNumber} {dropOffLocation.StreetName.toUpperCase()}</p>
                    <p>&emsp; &emsp; &emsp; &emsp; &emsp;&emsp;&ensp;&nbsp;{dropOffLocation.City} {dropOffLocation.Province} {dropOffLocation.PostalCode}</p>
                  </Grid>
                </Grid>
              </Card>

              <Card style={{ padding: '2em', marginBottom: '2em' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box>
                    <b>Protect your rental car at $10 per calendar day</b><br />

                    Covers your rental car from collision damage, theft and vandalism
                    Up to $35,000 in primary coverage with $0 deductible
                  </Box>
                  <GppGoodIcon sx={{ fontSize: 60 }} />
                </Box>
                <Divider sx={{ marginTop: '1em', marginBottom: '1em' }} />
                Interested? Just add it on the next step.
                <Button variant="contained" onClick={calculateFees} style={{ marginTop: '2em', marginLeft: '10em', paddingLeft: "2.5em", paddingRight: "2.5em" }}>Add</Button>
                <Button variant="contained" onClick={removeFees} style={{ marginTop: '2em', marginLeft: '1em', background: "red" }}>Remove</Button>
              </Card>

              <Box color={'#fff'}>
                <h2>Rental policies</h2>
              </Box>
              <Card style={{ padding: '2em', marginBottom: '2em' }}>
                <b>Cancellation and no-show policy</b><br />
                Free cancellation up to pick-up. <br />You will not be charged anything for the rental since the booking was risk-free.
              </Card>

              <Card style={{ padding: '2em', marginBottom: '2em' }}>
                <b>Age surcharge</b><br />
                Drivers under 25 or over 70 years of age may need to pay an extra fee.
              </Card>

              <Link href="#" color="primary">
                {`View rules and restrictions`} <OpenInNewIcon />
              </Link>

            </Grid>

            {/* Car Load section */}
            <Grid item xs={4}>
              <Box>
                {/* Auto fill price */}
                <Card style={{ padding: '2em', marginBottom: '2em' }}>
                  {
                    carType.map((data, index) => {
                      return <Typography variant="h4" key={index}>{(data.DailyCost).toLocaleString('en-US',
                        {
                          style: 'currency',
                          currency: 'CAD',
                        })} per day</Typography>
                    })
                  }
                  Free cancellation<br />
                  Pay at pick-up
                </Card>
                <Card style={{ padding: '2em', marginBottom: '2em' }}>
                  <b>Price details ({pickUpLocation.City}, {pickUpLocation.Province})</b>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Rental Fees: </span>
                    {
                      carType.map((data) => {
                        if (normalFees === 0) {
                          setNormalFees(diffDays * data.DailyCost)
                          setTotalFees(diffDays * data.DailyCost)
                        }
                        return <span>{normalFees.toLocaleString('en-US',
                          {
                            style: 'currency',
                            currency: 'CAD',
                          })
                        }</span>
                      })}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Fee(Protection)</span>
                    <span>{fees.toLocaleString('en-US',
                      {
                        style: 'currency',
                        currency: 'CAD',
                      })}</span>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GST({gst}%)</span>
                    {
                      carType.map(data => {
                        if(gst === null){
                            setGST(GST[pickUpLocation.Province.replace(/ /g, '')]);
                        }
                        else{
                          return <span>{(calculateTax(gst, totalFees)).toLocaleString('en-US',
                          {
                            style: 'currency',
                            currency: 'CAD',
                          })}</span>
                        }
                        
                    })}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>PST({pst}%)</span>
                    {
                      carType.map(data => {
                        if(pst === null){
                            setPST(PST[pickUpLocation.Province.replace(/ /g, '')]);
                        }
                        else{
                          return <span>{(calculateTax(pst, totalFees)).toLocaleString('en-US',
                          {
                            style: 'currency',
                            currency: 'CAD',
                          })}</span>
                        }
                        
                    })}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>HST({hst}%)</span>
                    {
                      carType.map(data => {
                        if(hst === null){
                            setHST(HST[pickUpLocation.Province.replace(/ /g, '')]);
                        }
                        else{
                          return <span>{(calculateTax(hst, totalFees)).toLocaleString('en-US',
                          {
                            style: 'currency',
                            currency: 'CAD',
                          })}</span>
                        }
                        
                    })}
                  </Box>
                  <Divider sx={{ marginTop: '1em', marginBottom: '1em' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span><b>Total</b></span>
                    {
                      carType.map(data => {
                          return <span>{(totalFees+calculateTax(gst, totalFees)+calculateTax(pst, totalFees)+calculateTax(hst, totalFees)).toLocaleString('en-US',
                          {
                            style: 'currency',
                            currency: 'CAD',
                          })}</span>
                    })}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Pay at pick-up</span>
                    {
                      carType.map(data => {
                          return <span>{(totalFees+calculateTax(gst, totalFees)+calculateTax(pst, totalFees)+calculateTax(hst, totalFees)).toLocaleString('en-US',
                          {
                            style: 'currency',
                            currency: 'CAD',
                          })}</span>
                    })}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Pay now</span>
                    {
                      carType.map(data => {
                          return <span>{((totalFees+calculateTax(gst, totalFees)+calculateTax(pst, totalFees)+calculateTax(hst, totalFees))).toLocaleString('en-US',
                          {
                            style: 'currency',
                            currency: 'CAD',
                          })}</span>
                    })}
                  </Box>

                  <Box display='flex' justifyContent={'center'} mt={2}>
                    <ThemeProvider theme={theme}>
                      <Button onClick={handleOpen} variant="contained">Apply for reservation</Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Thank you for choosing CarGrab!
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Your rental application will be viewed shortly.
                          </Typography>
                        </Box>
                      </Modal>
                    </ThemeProvider>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box textAlign={'center'} color={'#fff'}>
          Your opinion matters. Tell us what's missing on this page<br />
          <ThemeProvider theme={theme}>
            <Button variant="contained" style={{ marginTop: '2em' }}>Share Feedback</Button>
          </ThemeProvider>
        </Box>
      </Box>

      {/*Footer Section*/}
      <Footer />
    </Box>

  );
};