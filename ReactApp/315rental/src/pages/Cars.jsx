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
import TimePickup from "../components/TimePSelector";
import TimeDropoff from "../components/TimeDSelector";
import { Link as RouterLink, useRoutes } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import "./css/Car.css"
import "./css/Normalize.css";
import { useLocation, useNavigate } from 'react-router-dom';

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

  const [pickUpLocation, setPickUpLocation] = React.useState(location.state === null ? null : location.state.PickUpLocation);
  const [dropOffLocation, setDropOffLocation] = React.useState(location.state === null ? null : location.state.DropOffLocation === null ? location.state.PickUpLocation : location.state.DropOffLocation);
  const [pickUpDate, setPickUpDate] = React.useState(location.state === null ? null : location.state.PickUpDate);
  const [dropOffDate, setDropOffDate] = React.useState(location.state === null ? null : location.state.DropOffDate);

  const cardInfo = []

  const [cars, setCars] = useState([]);

  const getCars = async () => {
    axios.get('http://localhost:8000/api/cars/?format=json')
      .then(response => {
        setCars(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getCars()
  }, []);

  const renderCard = (card, index) => {
    return (
      <Card sx={{ width: '100%', marginBottom: '2em', marginLeft: '2em' }}>
        <CardActionArea component={RouterLink} to={"/details"} state={{
          /*passing data here*/
          PickUpLocation: pickUpLocation,
          DropOffLocation: dropOffLocation === null ? pickUpLocation : dropOffLocation,
          PickUpDate: pickUpDate,
          DropOffDate: dropOffDate
          
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
  const handlePickUpLocation = (event) => {
    setPickUpLocation(event)
  } 
  const handleDropOffLocation = (event) => {
    setDropOffLocation(event)
  } 

  const handlePickUpDate = (event) => {
    setPickUpDate(event)
  }

  const handleDropOffDate = (event) => {
    setDropOffDate(event)
  }

  return (
    <div>
      <Header />

      {/* Search Section */}
      <Box>
        <Container style={{ marginTop: '2em', marginBottom: '3em' }}>
          <Grid container spacing={2} mb={4}>
            <Grid item xs={3}>
              <PickupSearch onChange={value => handlePickUpLocation(value)} value={pickUpLocation} />
            </Grid>
            <Grid item xs={2}>
              <DateDropoff onChange={value => handleDropOffDate(value)} value={dropOffDate} />
            </Grid>
            <Grid item xs={2}>
              <DatePickup onChange={value => handlePickUpDate(value)} value={pickUpDate} />
            </Grid>
            <Grid item xs={2}>
              <TimePickup />
            </Grid>
            <Grid item xs={2}>
              <TimeDropoff />
            </Grid>
            <Grid item xs={1}>
              <ThemeProvider theme={theme}>
                <Button variant="contained">Search</Button>
              </ThemeProvider>
            </Grid>
          </Grid>
          <DropoffSearch onChange={value => handleDropOffLocation(value)} value={dropOffLocation} />
        </Container>
      </Box>

      {/* Display of Cars */}
      <Box style={{ background: '#21033a' }}>
        <Container>
          <Grid container spacing={2}>
            {/* Filter section */}
            <Grid item xs={3}>
              <CarFilter />
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

