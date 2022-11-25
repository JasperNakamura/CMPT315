import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormControlLabel, Grid, Switch, TextField, Tabs, Tab, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { useEffect } from "react";
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Cars () {
  const [value, setValue] = React.useState(0);
    
  const [branch, setBranch] = React.useState([]);
  const [carType, setCarType] = React.useState([]);

  /* Branch API */
  const getBranch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/branches/?format=json`)
      if (response.length > 0 || response.data !== undefined) {
        setBranch(response.data);
      }
    } catch (error) {
        console.log(error);
    }  
  }

  /* CarType API */
  const getCarType = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/carTypes/?format=json`)
        if (response.length > 0 || response.data !== undefined) {
          setCarType(response.data);
        }
      } catch (error) {
          console.log(error);
      }  
  }

  useEffect(() => {
      getBranch();
      getCarType();
  }, []);

  /* Input field values */
  const [manufacturer, setMenufacturer] = React.useState("");
  const [model, setModel] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");
  const [colour, setColour] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [available, setAvailable] = React.useState(true);
  const [mileage, setMileage] = React.useState("");

  /* Axios post location */
  const handleSubmit = async (event) =>{
      event.preventDefault();
  
      await axios.post('http://127.0.0.1:8000/api/cars/', {
          Manufacturer: manufacturer, 
          Model: model,
          FuelType: fuelType,
          Colour: colour,
          LicensePlate: licensePlate,
          Status: available,
          Mileage: mileage,
          Branch: branch[bIndex].BranchID,
          Type: carType[cIndex].TypeID,
      })
      .then(res => console.log(res)) 
      .catch(err => console.log(err))
  }

  const handleChange = (event) => {
      if(event.target.id === "manufacturer_input_id"){
          setMenufacturer(event.target.value);
      }
      if(event.target.id === "model_input_id"){
          setModel(event.target.value);          
      }
      if(event.target.id === "fueltype_input_id"){
          setFuelType(event.target.value);        
      }
      if(event.target.id === "colour_input_id"){
          setColour(event.target.value);
      }
      if(event.target.id === "licenseplate_input_id"){
          setLicensePlate(event.target.value);
      }
      if(event.target.id === "available_input_id"){
          setAvailable(!event.target.checked);
      }
      if(event.target.id === "mileage_input_id") {
          setMileage(event.target.value);
      }
      if(event.target.name === "branch_input_id"){
          setbIndex(event.target.value);
      }
      if(event.target.name === "cartype_input_id"){
          setcIndex(event.target.value);
      }
  };

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  }

  const [bIndex, setbIndex] = React.useState(0);
  const [cIndex, setcIndex] = React.useState(0);

  return (
    <div>
      <Header/>

      <h1>Manage Car Database</h1>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabs} aria-label="basic tabs example">
          <Tab label="Add Car" {...a11yProps(0)} />
          <Tab label="Update Car" {...a11yProps(1)} />
          <Tab label="Delete Car" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* Add Car */}
      <TabPanel value={value} index={0}>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <div>
              <TextField                          
                  sx={{m: 2}}
                  required
                  id="manufacturer_input_id"
                  label="Manufacturer"                  
                  value={manufacturer}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="model_input_id"
                  label="Model"
                  value={model}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="fueltype_input_id"
                  label="FuelType"
                  value={fuelType}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="colour_input_id"
                  label="Colour"
                  value={colour}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="licenseplate_input_id"
                  label="LicensePlate"
                  value={licensePlate}
                  onChange={handleChange}
              />

              <div>
                  <FormControlLabel control={<Switch id="available_input_id"/>} label="Available" labelPlacement='start' onChange={handleChange} defaultChecked={false} value={available}/>
              </div>

              <TextField
                  sx={{m: 2}}
                  required
                  id="mileage_input_id"
                  label="Mileage"
                  value={mileage}
                  onChange={handleChange}
              />

              <br/>

              <h2>Branch Location</h2>
              <select
                  required
                  name="branch"
                  id="branch-simple-select"
                  onChange={handleChange}
              >
                  <option disabled selected value> ー Select Branch Location* ー </option>
                  {branch.map((location, index) => {
                      return <option key={index} value={location.BranchID}>{location.City}</option>
                  })}
              </select>

              <h2>Car Type</h2>
              <select
                  required
                  name="cartype"
                  id="cartype-simple-select"
                  onChange={handleChange}
              >
                  <option disabled selected value> ー Select Car Type* ー </option>
                  {carType.map((description, index) => {
                      return <option key={index} value={description.TypeID}>{description.Description}</option>
                  })}
              </select>
            </div>

            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={3}>
                    <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} variant="contained" onClick={handleSubmit}>Add Car</Button>
                </Grid>   
            </Grid> 
          </Box>
        </Container>
      </TabPanel>
      {/* Update Car */}
      <TabPanel value={value} index={1}>
        <Container>
          {/* FILL WITH CARS (USE UPDATE CLIENTS FOR REFERENCE) */}
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={3}>
              <select>
                <option value="" disabled={true}>
                    --Choose Car--
                </option>
              </select>    
            </Grid>   
          </Grid> 

          {/* CHANGE ON CHANGE AND HOW IT HANDLES THE UPDATE */}
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <div>
              <TextField                          
                  sx={{m: 2}}
                  required
                  id="manufacturer_input_id"
                  label="Manufacturer"                  
                  value={manufacturer}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="model_input_id"
                  label="Model"
                  value={model}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="fueltype_input_id"
                  label="FuelType"
                  value={fuelType}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="colour_input_id"
                  label="Colour"
                  value={colour}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  id="licenseplate_input_id"
                  label="LicensePlate"
                  value={licensePlate}
                  onChange={handleChange}
              />

              <div>
                  <FormControlLabel control={<Switch id="available_input_id"/>} label="Available" labelPlacement='start' onChange={handleChange} defaultChecked={false} value={available} />
              </div>

              <TextField
                  sx={{m: 2}}
                  required
                  id="mileage_input_id"
                  label="Mileage"
                  value={mileage}
                  onChange={handleChange}
              />

              <br/>

              <h2>Branch Location</h2>
              <select
                  required
                  name="branch"
                  id="branch-simple-select"
                  onChange={handleChange}
              >
                  <option disabled selected value> ー Select Branch Location* ー </option>
                  {branch.map((location, index) => {
                      return <option key={index} value={location.BranchID}>{location.City}</option>
                  })}
              </select>

              <h2>Car Type</h2>
              <select
                  required
                  name="cartype"
                  id="cartype-simple-select"
                  onChange={handleChange}
              >
                  <option disabled selected value> ー Select Car Type* ー </option>
                  {carType.map((description, index) => {
                      return <option key={index} value={description.TypeID}>{description.Description}</option>
                  })}
              </select>
            </div>

            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={3}>
                    <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} variant="contained" onClick={handleSubmit}>Update</Button>
                </Grid>   
            </Grid> 
          </Box>
        </Container>
      </TabPanel>
      {/* Delete Car */}
      <TabPanel value={value} index={2}>
        {/* FILL WITH CARS (USE UPDATE CLIENTS FOR REFERENCE) */}
        <Container>
          <Grid container spacing={0} justifyContent="center">
            <Grid item xs={3}>
              <select>
                <option value="" disabled={true}>
                    --Choose Car to delete--
                </option>
              </select>    
            </Grid>   
          </Grid> 

        {/* MAKE THESE ALL READ ONLYS */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <div>
            <TextField                          
                sx={{m: 2}}
                required
                disabled
                id="manufacturer_input_id"
                label="Manufacturer"                  
                value={manufacturer}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                id="model_input_id"
                label="Model"
                value={model}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                id="fueltype_input_id"
                label="FuelType"
                value={fuelType}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                id="colour_input_id"
                label="Colour"
                value={colour}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                id="licenseplate_input_id"
                label="LicensePlate"
                value={licensePlate}
                onChange={handleChange}
            />

            <div>
                <FormControlLabel control={<Switch id="available_input_id"/>} label="Available" labelPlacement='start' onChange={handleChange} defaultChecked={false} value={available} disabled/>
            </div>

            <TextField
                sx={{m: 2}}
                required
                disabled
                id="mileage_input_id"
                label="Mileage"
                value={mileage}
                onChange={handleChange}
            />

            <br/>

            <h2>Branch Location</h2>
            <select
                required
                disabled
                name="branch"
                id="branch-simple-select"
                onChange={handleChange}
            >
                <option disabled selected value> ー Select Branch Location* ー </option>
                {branch.map((location, index) => {
                    return <option key={index} value={location.BranchID}>{location.City}</option>
                })}
            </select>

            <h2>Car Type</h2>
            <select
                required
                disabled
                name="cartype"
                id="cartype-simple-select"
                onChange={handleChange}
            >
                <option disabled selected value> ー Select Car Type* ー </option>
                {carType.map((description, index) => {
                    return <option key={index} value={description.TypeID}>{description.Description}</option>
                })}
            </select>
          </div>

          <Grid container spacing={0} justifyContent="center">
              <Grid item xs={3}>
                  <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} variant="contained" onClick={handleSubmit}>Delete</Button>
              </Grid>   
          </Grid> 
        </Box>
      </Container>
      </TabPanel>
    </Box>
    </div>
  );
}