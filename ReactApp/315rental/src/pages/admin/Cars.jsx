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
  /* Selection Values */
  const [value, setValue] = React.useState(0); //for tabs
  const [branch, setBranch] = React.useState("");
  const [carType, setCarType] = React.useState("");
  const [car, setCar] = React.useState("");
  
  /* API Arrays */
  const [branches, setBranches] = React.useState([]);
  const [carTypes, setCarTypes] = React.useState([]);
  const [cars, setCars] = React.useState([]);

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

  /* CarType API */
  const getCarTypes = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/carTypes/?format=json`)
        if (response.length > 0 || response.data !== undefined) {
          setCarTypes(response.data);
        }
      } catch (error) {
          console.log(error);
      }  
  }

  /* Car API */
   const getCars = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cars/?format=json`)
        if (response.length > 0 || response.data !== undefined) {
          setCars(response.data);
        }
      } catch (error) {
          console.log(error);
    }  
  }

  useEffect(() => {
      getBranches();
      getCarTypes();
      getCars();
  }, []);

  /* Input field values */
  const [manufacturer, setManufacturer] = React.useState("");
  const [model, setModel] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");
  const [colour, setColour] = React.useState("");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [available, setAvailable] = React.useState(true);
  const [mileage, setMileage] = React.useState("");

  /* Axios post location */
  const handleAdd = async (event) => {
      event.preventDefault();
  
      await axios.post('http://127.0.0.1:8000/api/cars/', {
        Manufacturer: manufacturer, 
        Model: model,
        FuelType: fuelType,
        Colour: colour,
        LicensePlate: licensePlate,
        Status: available,
        Mileage: parseInt(mileage),
        Branch: parseInt(branch),
        Type: parseInt(carType),
      })
      .then(res => console.log(res)) 
      .catch(err => console.log(err));
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    await axios.put(`http://127.0.0.1:8000/api/cars/${car}/`, {
      Manufacturer: manufacturer, 
      Model: model,
      FuelType: fuelType,
      Colour: colour,
      LicensePlate: licensePlate,
      Status: available,
      Mileage: parseInt(mileage),
      Branch: parseInt(branch),
      Type: parseInt(carType),
    })
    .then(res => {
      console.log(res)
      getCars();
    }) 
    .catch(err => console.log(err));
  }

  const handleDelete = async (event) => {
    event.preventDefault();

    await axios.delete(`http://127.0.0.1:8000/api/cars/${car}/`)
    .then(res => { 
      console.log(res)
      getCars();
      setManufacturer("");
      setModel("");
      setFuelType("");
      setColour("");
      setLicensePlate("");
      setAvailable(false);
      setMileage("");
      setBranch("");
      setCarType("");
    }) 
    .catch(err => console.log(err));
  }

  const handleChange = (event) => {
    if(event.target.id === "manufacturer_input_id"){
      setManufacturer(event.target.value);
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
      setAvailable(event.target.checked);
    }
    if(event.target.id === "mileage_input_id") {
      setMileage(event.target.value);
    }
    if(event.target.id === "branch_input_id"){
      setBranch(event.target.value);
    }
    if(event.target.id === "cartype_input_id"){
      setCarType(event.target.value);
    }
  };

  const handleTabs = (event, newValue) => {
    setValue(newValue);
    getCars();
    
    setManufacturer("");
    setModel("");
    setFuelType("");
    setColour("");
    setLicensePlate("");
    setAvailable(false);
    setMileage("");
    setBranch("");
    setCarType("");
  }

  const selectCar = async (event) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/cars/${event.target.value}/?format=json`)
      if (response.length > 0 || response.data !== undefined) {
        let vehicle = response.data;
        setCar(vehicle.CarID);
        setManufacturer(vehicle.Manufacturer);
        setModel(vehicle.Model);
        setFuelType(vehicle.FuelType);
        setColour(vehicle.Colour);
        setLicensePlate(vehicle.LicensePlate);
        setAvailable(vehicle.Status);
        setMileage(vehicle.Mileage);
        setBranch(vehicle.Branch);
        setCarType(vehicle.Type);
      }
    } catch (error) {
        console.log(error);
    }
  }

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
                  name="manufacturer_add"
                  id="manufacturer_input_id"
                  label="Manufacturer"                  
                  value={manufacturer}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="model_add"
                  id="model_input_id"
                  label="Model"
                  value={model}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="fueltype_add"
                  id="fueltype_input_id"
                  label="FuelType"
                  value={fuelType}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="colour_add"
                  id="colour_input_id"
                  label="Colour"
                  value={colour}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="licenseplate_add"
                  id="licenseplate_input_id"
                  label="LicensePlate"
                  value={licensePlate}
                  onChange={handleChange}
              />

              <div>
                  <FormControlLabel 
                    control={<Switch id="available_input_id" checked={available}/>} 
                    name="availabile_add"
                    label="Available" 
                    labelPlacement='start' 
                    onChange={handleChange}
                  />
              </div>

              <TextField
                  sx={{m: 2}}
                  required
                  name="mileage_add"
                  id="mileage_input_id"
                  label="Mileage"
                  value={mileage}
                  onChange={handleChange}
              />

              <br/>

              <h2>Branch Location</h2>
              <select
                  required
                  name="branch_ad"
                  id="branch_input_id"
                  onChange={handleChange}
              >
                  <option disabled selected value> ー Select Branch Location* ー </option>
                  {branches.map((location, index) => {
                      return <option key={index} value={location.BranchID}>{location.City}</option>
                  })}
              </select>

              <h2>Car Type</h2>
              <select
                  required
                  name="cartype_add"
                  id="cartype_input_id"
                  onChange={handleChange}
              >
                  <option disabled selected value> ー Select Car Type* ー </option>
                  {carTypes.map((type, index) => {
                      return <option key={index} value={type.TypeID}>{type.Description}</option>
                  })}
              </select>
            </div>

            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={3}>
                    <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} 
                      variant="contained"
                      name="button_add" 
                      onClick={handleAdd}>
                        Add Car
                    </Button>
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
              <select
              required
              name="car_update"
              id="update_car_select_id"
              onChange={selectCar}>
                <option disabled selected value> ー Select Vehicle* ー </option>
                {cars.map((vehicle, index) => {
                  return <option key={index} value={vehicle.CarID}>{vehicle.Colour} {vehicle.Manufacturer} {vehicle.Model} ({vehicle.LicensePlate})</option>
                })}
              </select>    
            </Grid>   
          </Grid> 

          {/* CHANGE ON CHANGE AND HOW IT HANDLES THE UPDATE */}
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <div>
              <TextField                          
                  sx={{m: 2}}
                  required
                  name="manufacturer_update"
                  id="manufacturer_input_id"
                  label="Manufacturer"                  
                  value={manufacturer}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="model_update"
                  id="model_input_id"
                  label="Model"
                  value={model}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="fueltype_update"
                  id="fueltype_input_id"
                  label="FuelType"
                  value={fuelType}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="colour_update"
                  id="colour_input_id"
                  label="Colour"
                  value={colour}
                  onChange={handleChange}
              />

              <TextField
                  sx={{m: 2}}
                  required
                  name="licenseplate_update"
                  id="licenseplate_input_id"
                  label="LicensePlate"
                  value={licensePlate}
                  onChange={handleChange}
              />

              <div>
                  <FormControlLabel 
                    control={<Switch id="available_input_id" checked={available}/>} 
                    name="available_update"
                    label="Available" 
                    labelPlacement='start' 
                    onChange={handleChange}
                  />
              </div>

              <TextField
                  sx={{m: 2}}
                  required
                  name="mileage_update"
                  id="mileage_input_id"
                  label="Mileage"
                  value={mileage}
                  onChange={handleChange}
              />

              <br/>

              <h2>Branch Location</h2>
              <select
                  required
                  name="branch_update"
                  id="branch_input_id"
                  onChange={handleChange}
                  value={branch}
              >
                  <option disabled selected value> ー Select Branch Location* ー </option>
                  {branches.map((location, index) => {
                      return <option key={index} value={location.BranchID}>{location.City}</option>
                  })}
              </select>

              <h2>Car Type</h2>
              <select
                  required
                  name="cartype_update"
                  id="cartype_input_id"
                  onChange={handleChange}
                  value={carType}
              >
                  <option disabled selected value> ー Select Car Type* ー </option>
                  {carTypes.map((type, index) => {
                      return <option key={index} value={type.TypeID}>{type.Description}</option>
                  })}
              </select>
            </div>

            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={3}>
                    <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} 
                      variant="contained"
                      name="button_modify" 
                      onClick={handleUpdate}>
                        Update
                    </Button>
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
              <select
                required
                name="car_delete"
                id="delete_car_select_id"
                onChange={selectCar}>
                  <option disabled selected value> ー Select Vehicle* ー </option>
                  {cars.map((vehicle, index) => {
                    return <option key={index} value={vehicle.CarID}>{vehicle.Colour} {vehicle.Manufacturer} {vehicle.Model} ({vehicle.LicensePlate})</option>
                  })}
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
                name="manufacturer_delete"
                id="manufacturer_input_id"
                label="Manufacturer"                  
                value={manufacturer}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                name="model_delete"
                id="model_input_id"
                label="Model"
                value={model}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                name="fueltype_delete"
                id="fueltype_input_id"
                label="FuelType"
                value={fuelType}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                name="colour_delete"
                id="colour_input_id"
                label="Colour"
                value={colour}
                onChange={handleChange}
            />

            <TextField
                sx={{m: 2}}
                required
                disabled
                name="licenseplate_delete"
                id="licenseplate_input_id"
                label="LicensePlate"
                value={licensePlate}
                onChange={handleChange}
            />

            <div>
                <FormControlLabel 
                  control={<Switch id="available_input_id" checked={available}/>} 
                  name="available_delete"
                  label="Available" 
                  labelPlacement='start' 
                  onChange={handleChange}
                  disabled
                />
            </div>

            <TextField
                sx={{m: 2}}
                required
                disabled
                name="mileage_delete"
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
                name="branch_delete"
                id="branch_select_id"
                value={branch}
            >
                <option disabled selected value> ー Select Branch Location* ー </option>
                {branches.map((location, index) => {
                    return <option key={index} value={location.BranchID}>{location.City}</option>
                })}
            </select>

            <h2>Car Type</h2>
            <select
                required
                disabled
                name="cartype_delete"
                id="cartype_select_id"
                value={carType}
            >
                <option disabled selected value> ー Select Car Type* ー </option>
                {carTypes.map((description, index) => {
                    return <option key={index} value={description.TypeID}>{description.Description}</option>
                })}
            </select>
          </div>

          <Grid container spacing={0} justifyContent="center">
              <Grid item xs={3}>
                  <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} 
                    variant="contained" 
                    name="button_delete"
                    onClick={handleDelete}>
                      Delete
                  </Button>
              </Grid>   
          </Grid> 
        </Box>
      </Container>
      </TabPanel>
    </Box>
    </div>
  );
}