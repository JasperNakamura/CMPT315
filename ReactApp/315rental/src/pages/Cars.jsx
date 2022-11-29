import { Button, CardActionArea, CardActions, Container, Divider, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import CarFilter from "../components/CarFilter";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PickupSearch from "../components/LocationPSearch";
import DropoffSearch from "../components/LocationDSearch";
import DateDropoff from "../components/DateDSelector";
import DatePickup from "../components/DatePSelector";
import { Link as RouterLink, useRoutes } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import "./css/Car.css"
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'

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
})

const Cars = () => {

  const location = useLocation();
  const [carData, setCarData] = useState('');

  const [pickUpLocation, setPickUpLocation] = React.useState(location.state.PickUpLocation == null ? '' : location.state.PickUpLocation);
  const [dropOffLocation, setDropOffLocation] = React.useState(location.state.DropOffLocation == null ? "" : location.state.DropOffLocation === null ? location.state.PickUpLocation : location.state.DropOffLocation);
  const [pickUpDate, setPickUpDate] = React.useState(location.state.PickUpDate == null ? "" : location.state.PickUpDate);
  const [dropOffDate, setDropOffDate] = React.useState(location.state.DropOffDate == null ? "" : location.state.DropOffDate);

  const [carType, setCarType] = useState('')
  const [manufacturer, setManuFacturer] = React.useState('')
  const [colour, setColour] = React.useState('')
  const [fuelType, setFuelType] = React.useState('')

  const cardInfo = []

  const [cars, setCars] = useState([]);

  const getCars = async () => {
    axios.get(`${"http://localhost:8000/api/cars/?format=json" +
      "&available=" + pickUpDate + "," + dropOffDate +
      "&Branch=" + pickUpLocation.ID +
      "&Type=" + carType +
      "&Manufacturer=" + manufacturer +
      "&Colour=" + colour +
      "&FuelType=" + fuelType
      }`)
      .then(response => {
        setCars(response.data);
      }).catch(error => {
        
      })
  }

  useEffect(() => {
    getCars();
    getBranches();
  }, []);



  const renderCard = (card, index) => {
    return (
      <Card sx={{ width: '100%', marginBottom: '2em', marginLeft: '2em' }}>
        <CardActionArea component={RouterLink} to={"/details"} state={{
          /*passing data here*/
          PickUpLocation: pickUpLocation,
          DropOffLocation: dropOffLocation === null ? pickUpLocation : dropOffLocation,
          PickUpDate: pickUpDate,
          DropOffDate: dropOffDate,
          CarDetails: cars[index]
        }}>
          <CardMedia
            component="img"
            height="180px"
            /*Add image here*/
            image={card.image}
            alt="car"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {card.CarName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.CarDetails}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    )
  }

  {/*Change image placeholder link later*/ }
  for (let car of cars) {
    cardInfo.push({ image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pavilioncars.co.uk%2Fassets%2Fuploaded%2Fimages%2Fvehicles%2F10424st1280089.png&f=1&nofb=1&ipt=014c64a0acbc9900558905b0cac243a51b168e5567c9ac94b5da7541321ebea3&ipo=images", CarName: car.Manufacturer + " " + car.Model, CarDetails: car.Colour })
    //console.log(car.Manufacturer)//
  }


  const handlePickUpDate = (event) => {
    setPickUpDate(moment(event).format("YYYY-MM-DD"))
  }

  const handleDropOffDate = (event) => {
    setDropOffDate(moment(event).format("YYYY-MM-DD"))
  }

  /* API Arrays */
  const [branches, setBranches] = React.useState([]);

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

  const handleChange = (event) => {
    const content = event.target.value.split(',');
    if (event.target.id === "pickBranch_input_id") {
      console.log("1", content[1], content[0])
      setPickUpLocation({ City: content[1], ID: content[0] });
    }
    if (event.target.id === "dropBranch_input_id") {
      console.log("2", content[1],content[0])
      setDropOffLocation({ City: content[1], ID: content[0] });
    }
  };

  function handleSubmit() {
    setPickUpLocation(pickUpLocation);
    setDropOffLocation(dropOffLocation);
    setPickUpDate(pickUpDate);
    setDropOffDate(dropOffDate);
    getCars();
  }

  const { render, returnValue } = CarFilter()
  /* return value is an obj of all the filter option - only update when filter/clear is clicked*/
  useEffect(() => {
    setCarType(returnValue.BodyType == null ? '' : returnValue.BodyType)
    setColour(returnValue.Colors == null ? '' : returnValue.Colors)
    setManuFacturer(returnValue.Manufacturers == null ? '' : returnValue.Manufacturers)
    setFuelType(returnValue.Fuels == null ? '' : returnValue.Fuels)
  }, [returnValue])

  useEffect(() => {
    getCars()
  }, [carType, colour, fuelType, manufacturer])

  return (
    <div>
      <Header />

      {/* Search Section */}
      <Box>
        <Container style={{ marginTop: '2em', marginBottom: '3em' }}>
          <Card style={{ marginTop: '2em', marginBottom: '2em', padding: '2em' }}>
            <Box sx={{ fontSize: 'h5.fontSize', fontWeight: 'bold' }} mb={1}>
              Search Car
            </Box>
            <Grid container spacing={2} mb={4}>
              <Grid item xs={4}>
                <DatePickup onChange={value => handlePickUpDate(value)} value={pickUpDate} />
              </Grid>
              <Grid item xs={4}>
                <DateDropoff onChange={value => handleDropOffDate(value)} value={dropOffDate} />
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={4}>
              <Grid item xs={6}>
                <Box>
                  <h2>Pick-Up Location</h2>
                  <select
                    required
                    name="branch_ad"
                    id="pickBranch_input_id"
                    onChange={handleChange}
                  >
                    <option selected value={[pickUpLocation.BranchID, pickUpLocation.City]} disabled hidden>{pickUpLocation.City}</option>
                    {branches.map((location, index) => {
                      return <option key={index} value={[location.BranchID, location.City]}>{location.City}</option>
                    })}
                  </select>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <h2>Drop-Off Location</h2>
                  <select
                    required
                    name="branch_ad"
                    id="dropBranch_input_id"
                    onChange={handleChange}
                  >
                    <option selected value={[dropOffLocation.BranchID, dropOffLocation.City]} disabled hidden>{dropOffLocation.City}</option>
                    {branches.map((location, index) => {
                      return <option key={index} value={[location.BranchID, location.City]}>{location.City}</option>
                    })}
                  </select>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" onClick={handleSubmit}>Search</Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* Display of Cars */}
      <Box style={{ background: '#21033a' }}>
        <Container>
          <Grid container spacing={2}>
            {/* Filter section */}
            <Grid item xs={3}>
              {render}
            </Grid>

            {/* Car Load section */}
            <Grid item xs={9} mt={{ xs: 2, sm: 5 }} pb={{ xs: 5, sm: 1 }}>
              <Grid container spacing={3} sx={{ alignItems: 'space-around' }}>
                {cardInfo.map(renderCard)}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </div>
  );
}

export default Cars

