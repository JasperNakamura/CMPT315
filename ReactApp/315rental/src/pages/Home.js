import Header from "../components/Header";
import Footer from "../components/Footer";
import "./css/Normalize.css"
import "./css/Home.css"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import PickupSearch from "../components/LocationPSearch";
import DropoffSearch from "../components/LocationDSearch";
import DatePickup from "../components/DateDSelector";
import DateDropoff from "../components/DatePSelector";
import TimePickup from "../components/TimePSelector";
import TimeDropoff from "../components/TimeDSelector";

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

const Home = () => {
    const cardInfo = [
      {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pavilioncars.co.uk%2Fassets%2Fuploaded%2Fimages%2Fvehicles%2F10424st1280089.png&f=1&nofb=1&ipt=014c64a0acbc9900558905b0cac243a51b168e5567c9ac94b5da7541321ebea3&ipo=images", CarName: "Minivan"},
      {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.JoWzStc0UAo9-SB__5Z57QHaEE%26pid%3DApi&f=1&ipt=1fe3257c797eff3bd41f7d05ce2647b043a43c805cbc2c8b157497c5e58b8653&ipo=images", CarName: "Premium"},
      {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Flarge%2F51506277545kjz8kz0chsgndxrrkpyu8hriezfnrsa1ncsolajspcvhrm4rb2pdxhdp1qwnqwuslhny5ez17l9coc0uoaomqoiifguxvungkrl5.png&f=1&nofb=1&ipt=526d193d36470b120187c38deece1b3c547735819f161540f7cf5d94cfebe03a&ipo=images", CarName: "Convertible"},
      {image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpluspng.com%2Fimg-png%2Fwhite-suv-png-2-41-2048.png&f=1&nofb=1&ipt=03143dea402174c1cbabb27cb90f06e3971dd8bb1525b1b65dd3d309f61d3260&ipo=images", CarName: "SUV"},
      {image: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fpickup_truck%2Fpickup_truck_PNG16336.png&f=1&nofb=1&ipt=23208ef240cb81df18a8f20f7752f7daebc28e467d9fe61c282659da2160a92c&ipo=images", CarName: "Pickup"},
      {image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.valueautorental.com%2Fwp-content%2Fimages%2Feconomy-car.png&f=1&nofb=1&ipt=2db106fd358178a686e793578d7397817aa56cb8ba9a999fcdcbbe4d23d2f53a&ipo=images", CarName: "Economy"},
  ]

  const renderCard = (card, index) => {
      return (
        <Card sx={{ margin: '10px'}} key={index}>
          <CardActionArea component={RouterLink} to="/cars">
            <CardContent>
              <Typography align="center" variant="h5" component="div">
                {card.CarName}
              </Typography>
              <CardMedia
                  component="img"
                  height="140"
                  /*Add image here*/
                  image={card.image}
                  alt="car"
                  sx={{objectFit: "contain"}}
              /> 
            </CardContent>
          </CardActionArea>
        </Card>
      )
  }
  return (
    <div>
      {/*Header section from component*/}
      <header><Header/></header>

      {/*Container-fluid, container and row are standard convention for website layouts*/}
      <div class="container-fluid" id="hero">
        <div class="container">
          <div class="jumbotron-card">
            <h2 id="jumbo-title">Search Car</h2>
            <div class="pickup-search">
              <PickupSearch/>
            </div>
            <div class="dropoff-search">
              <DropoffSearch/>
            </div>
            <div class="pickup-date">
              <DatePickup/>
            </div>
            <div class="dropoff-date">
              <DateDropoff/>
            </div>
            <div class="pickup-time">
              <TimePickup/>
            </div>
            <div class="dropoff-time">
              <TimeDropoff/>
            </div>
            <div class="search-button">
              <ThemeProvider theme={theme}>
              <Button variant="contained">Search</Button>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>

      {/*Popular Car Type Carousel*/}
      <div class="container-fluid">
        <div class="container">
          <h2>Popular Car Types</h2>
          <Box
            sx={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(6, 1fr)',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            {cardInfo.map(renderCard)}
          </Box>
          </div>
        </div>
      
      {/*Footer Section*/}
      <footer><Footer/></footer>
    </div>
  );
};

export default Home;

/*
      <div class="container-fluid">
        <div class="container">

        </div>
      </div>*/