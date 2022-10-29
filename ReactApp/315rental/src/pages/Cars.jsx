import Header from "../components/Header";
import "./css/Normalize.css"
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';

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
      <Card sx={{ maxWidth: 345 }} key={index}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
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
        <CardActions>
          <Button size="small" color="primary">
            Rent
          </Button>
        </CardActions>
      </Card>
    )
  } 

  for (let car of cars) {
    cardInfo.push({image: "", CarName: car.Manufacturer + " " + car.Model, CarDetails: car.Colour})
    console.log(car.Manufacturer)

  }

  return (
    <div>
      <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"header header header header"
        "sidebar main main main"
        "footer footer footer footer"`,
        }}>
        <Box sx={{ gridArea: 'header'}}><Header/></Box>
        <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main' }}>
          {cardInfo.map(renderCard)}
        </Box>
        <Box sx={{ gridArea: 'sidebar', bgcolor: 'error.main' }}>Filter Area</Box>
        <Box sx={{ gridArea: 'footer'}}><Footer/></Box>
      </Box>
      {console.log(cardInfo)}
    </div>
  );
}

export default Cars

