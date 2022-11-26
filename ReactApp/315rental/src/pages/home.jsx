import Header from "../components/Header";
import Footer from "../components/Footer";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CssBaseline, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PaidIcon from '@mui/icons-material/Paid';

import PickupSearch from "../components/LocationPSearch";
import DropoffSearch from "../components/LocationDSearch";
import DateDropoff from "../components/DateDSelector";
import DatePickup from "../components/DatePSelector";
import { Container } from "@mui/system";

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

  const [pickUpLocation, setPickUpLocation] = React.useState('');
  const [dropOffLocation, setDropOffLocation] = React.useState('');
  const [pickUpDate, setPickUpDate] = React.useState('');
  const [dropOffDate, setDropOffDate] = React.useState('');

  const handlePickUpLocation = (event) => {
    setPickUpLocation(event)
  }
  const handleDropOffLocation = (event) => {
    setDropOffLocation(event)
  }

  const handlePickUpDate = (event) => {
    console.log(event)
    setPickUpDate(event)
  }

  const handleDropOffDate = (event) => {
    console.log(event)
    setDropOffDate(event)
  }

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
    <Box bgcolor='#21033a'>
      {/* MUI's CSS Normalize */}
      <CssBaseline/>
      {/*Header section from component*/}
      <Header/>

      <Box sx={{minHeight: '70vh'}}>
        {/*Box Container is MUI standard convention for styling*/}
        <Box>
          <Container>
            <Card style={{marginTop: '2em', marginBottom: '2em', padding: '2em'}}>
              <Box sx={{fontSize: 'h5.fontSize', fontWeight: 'bold'}} mb={1}>
                Search Car
              </Box>
              <Grid container spacing={2} mb={4}>
                <Grid item xs={4}>
                  <DateDropoff onChange={value => handleDropOffDate(value)} value={dropOffDate} />
                </Grid>
                <Grid item xs={4}>
                  <DatePickup onChange={value => handlePickUpDate(value)} value={pickUpDate} />
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={4}>
                <Grid item xs={6}>
                  <PickupSearch onChange={value => handlePickUpLocation(value)} value={pickUpLocation} />
                </Grid>
                <Grid item xs={6}>
                  <DropoffSearch onChange={value => handleDropOffLocation(value)} value={dropOffLocation} />
                </Grid>
              </Grid>
              
              <Box display='flex' justifyContent={'center'}>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" component={RouterLink} to={"/cars"} state={{
                    /*passing data here*/
                    PickUpLocation: pickUpLocation,
                    DropOffLocation: dropOffLocation === null ? pickUpLocation : dropOffLocation,
                    PickUpDate: pickUpDate,
                    DropOffDate: dropOffDate
                  }}>Search</Button>
                </ThemeProvider>
              </Box>
            </Card>
          </Container>
        </Box>
                
        <Box sx={{backgroundColor: '#fff', height: '10vh', marginTop: '4em', marginBottom: '4em', display: 'flex', alignContent: 'center'}}>
          <Container sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
            <Box sx={{display: 'flex', alignItems: 'center', margin: '0 auto'}}>
              <CheckIcon sx={{fontSize: 40}}/>
              <h2>A trusted Car Rental Brand</h2>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', margin: '0 auto'}}>
              <LocalOfferIcon sx={{fontSize: 40}}/>
              <h2>Book a car in 3 easy steps</h2>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', margin: '0 auto'}}>
              <PaidIcon sx={{fontSize: 40}}/>
              <h2>Find great deals</h2>
            </Box>
          </Container>
          
        </Box>

        {/*Popular Car Type Carousel*/}
        <Box>
          <Container>
            <Box sx={{fontSize: 'h5.fontSize', color: '#fff'}}>
              Popular Car Type
            </Box>
            <Box
              sx={{
                display: 'grid', 
                gridTemplateColumns: 'repeat(6, 1fr)',
                bgcolor: 'inherit',
                borderRadius: 1,
              }}>
              {cardInfo.map(renderCard)}
            </Box>
          </Container>
        </Box>
      </Box>
      
      {/*Footer Section*/}
      <Footer/>
    </Box>
  );
};

export default Home;

/*
      <div class="container-fluid">
        <div class="container">

        </div>
      </div>*/