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
import {useLocation, useNavigate} from 'react-router-dom';

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

export default function Details () {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();
  console.log(location)


  return (
    <Box bgcolor='#21033a'>
      {/* MUI's CSS Normalize */}
      <CssBaseline/>
      {/*Header section from component*/}
      <Header/>

      {/*Box Container is MUI standard convention for styling*/}
      <Box>
        <Container>
          <ThemeProvider theme={theme}>
            <Box sx={{fontSize: 'h5.fontSize', fontWeight: 'bold', color: 'white'}} mb={1} mt={1}>
              <IconButton aria-label="back" color="primary" href="cars" to="/cars">
                <ArrowBackIcon />
              </IconButton>
              See all cars
            </Box>
          </ThemeProvider>

          <Divider/>

          <Grid container spacing={2}>
          {/* Filter section */}
          <Grid item xs={8}>
            <Card style={{padding: '2em', marginBottom: '2em'}}>
              ADD CAR TITLE AND DETAILLS IN THIS CARD
            </Card>

            {/* Free Cancellation */}
            <Card style={{padding: '2em', marginBottom: '2em'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <CalendarMonthIcon sx={{fontSize: 60}}/>
                <Box>
                  <b>Free cancellation</b><br/>
                  Lock in this price today, cancel free of charge anytime. Reserve now and pay at pick-up.
                  </Box>
              </Box>
            </Card>

            {/* NEEDS CAR RENTAL LOCATIONS FOR DROP OFF AND PICKUP */}
            <Card style={{padding: '2em', marginBottom: '2em'}}>
              <h2>Car Rental Location</h2>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <b>Pick-up</b>
                </Grid>
                <Grid item xs={6}>
                  <b>Drop-off</b>
                </Grid>
              </Grid>
            </Card>

            <Card style={{padding: '2em', marginBottom: '2em'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box>
                <b>Protect your rental car at $10 per calendar day</b><br/>

                Covers your rental car from collision damage, theft and vandalism
                Up to $35,000 in primary coverage with $0 deductible
                </Box>
                <GppGoodIcon sx={{fontSize: 60}}/>
              </Box>
              <Divider sx={{marginTop: '1em', marginBottom: '1em'}}/>
              Interested? Just add it on the next step.
            </Card>

            <Box color={'#fff'}>
              <h2>Rental policies</h2>
            </Box>
            <Card style={{padding: '2em', marginBottom: '2em'}}>
              <b>Cancellation and no-show policy</b><br/>
              Free cancellation up to pick-up. <br/>You will not be charged anything for the rental since the booking was risk-free.
            </Card>

            <Card style={{padding: '2em', marginBottom: '2em'}}>
              <b>Age surcharge</b><br/>
              Drivers under 25 or over 70 years of age may need to pay an extra fee.
            </Card>

            <Link href="#" color="primary">
              {`View rules and restrictions`} <OpenInNewIcon/>
            </Link>
            
          </Grid>

          {/* Car Load section */}
          <Grid item xs={4}>
            <Box>
              {/* Auto fill price */}
              <Card style={{padding: '2em', marginBottom: '2em'}}>
                <Typography variant="h3">$dollar</Typography> <span>per day</span>
                Free cancellation<br/>
                Pay at pick-up
              </Card>
              <Card style={{padding: '2em', marginBottom: '2em'}}>
                Price details
                Pay at pick-up
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Car rental fee x NUMBER OF DAYS</span>
                  <span>DOLLAR AMOUNT</span>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Taxes and fees</span>
                  <span>DOLLAR AMOUNT</span>
                </Box>
                <Divider sx={{marginTop: '1em', marginBottom: '1em'}}/>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <span><b>Total</b></span>
                  <span><b>DOLLAR AMOUNT</b></span>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Pay at pick-up</span>
                  <span>DOLLAR AMOUNT</span>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <span>Pay now</span>
                  <span>DOLLAR AMOUNT</span>
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
        Your opinion matters. Tell us what's missing on this page<br/>
        <ThemeProvider theme={theme}>
          <Button variant="contained" style={{marginTop: '2em'}}>Share Feedback</Button>
        </ThemeProvider>
      </Box>
      </Box>
      
      {/*Footer Section*/}
      <Footer/>
    </Box>
  );
};