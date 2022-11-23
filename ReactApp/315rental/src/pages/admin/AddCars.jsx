import * as React from 'react';
import { Box, Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { useEffect } from "react";
import axios from 'axios';

export default function AddCars () {
    
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

    const [bIndex, setbIndex] = React.useState(0);
    const [cIndex, setcIndex] = React.useState(0);

    return (
        <div>
            <Header/>

            <Container>
                <h1>Add Cars to Database</h1>
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
                            <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Grid>   
                    </Grid> 
                </Box>
            </Container>

        </div>
    );
}