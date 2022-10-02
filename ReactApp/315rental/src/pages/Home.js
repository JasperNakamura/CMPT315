import Header from "../components/Header";
import Footer from "../components/Footer";
import "./css/Normalize.css"
import "./css/Home.css"
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import * as React from 'react';

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
  return (
    <div>
      <body> 
        <Header/>
        <div class="jumbotron-image">
          <div class="jumbotron-card">
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
        <Footer/>
      </body>
    </div>
  );
};

export default Home;