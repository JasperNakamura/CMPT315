import Header from "../components/Header";
import "./css/Normalize.css"
import "./css/Home.css"
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

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
          <div class="jumbotron-text">
            <ThemeProvider theme={theme}>
             <Button variant="contained">Search</Button>
            </ThemeProvider>
          </div>
        </div>
        
        <footer>
          <p>&copy; 2022 CarGrab.com</p>
        </footer>
      </body>
    </div>
  );
};

export default Home;
