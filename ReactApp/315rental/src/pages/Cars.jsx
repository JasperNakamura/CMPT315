import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
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
import "./css/Car.css"
import "./css/Normalize.css";

const Cars = () => {
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
      <Grid item sx={{justifyContent: 'center'}} xs={12} sm={6} md={4} xl={3} key={index}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
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
      </Grid>
      
    )
  } 

  {/*Change image placeholder link later*/}
  for (let car of cars) {
    cardInfo.push({image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pavilioncars.co.uk%2Fassets%2Fuploaded%2Fimages%2Fvehicles%2F10424st1280089.png&f=1&nofb=1&ipt=014c64a0acbc9900558905b0cac243a51b168e5567c9ac94b5da7541321ebea3&ipo=images", CarName: car.Manufacturer + " " + car.Model, CarDetails: car.Colour})
    console.log(car.Manufacturer)
  }

  return (
    <div>
      <Header/>
      <Grid container spacing={2}>
        <Grid item xs={3}>
         <CarFilter/>
        </Grid>
        <Grid item xs={9} mt={{xs: 2, sm: 5}} pb={{xs: 5, sm: 1}}>
          <Grid container spacing={3} sx={{alignItems:'space-around'}}>
            {cardInfo.map(renderCard)}
          </Grid>    
        </Grid>
      </Grid>
       
      <Footer/>
    </div>
  );
}

export default Cars

