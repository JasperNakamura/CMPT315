import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"



export default function AddCars () {
    const [branch, setBranch] = React.useState('');
    const [cartype, setCartype] = React.useState('');
    const [manufacturer, setMenufacturer] = React.useState("");
    const [model, setModel] = React.useState("");
    const [fuelType, setFuelType] = React.useState("");
    const [colour, setColour] = React.useState("");
    const [licencePlate, setLicencePlate] = React.useState("");
    const [available, setAvailable] = React.useState(true);

    const handleChange = (event) => {
        console.log(event.target.id);
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
        if(event.target.id === "licenceplate_input_id"){
            setLicencePlate(event.target.value);
        }
        if(event.target.id === "available_input_id"){
            setAvailable(!event.target.checked);
        }
        setBranch(event.target.value);
        setCartype(event.target.value);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        const manufacturerValue = manufacturer;
        const modelValue = model;
        const fuelTypeValue = fuelType;
        const colourValue = colour;
        const availableValue = available;

        console.log("Submit: ", manufacturerValue, modelValue, fuelTypeValue, colourValue, availableValue);
    }

    

    return (
        <div>
            <Header/>

            <Container>
                <h1>Add Cars to Database</h1>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div>
                        <TextField                          
                            required
                            id="manufacturer_input_id"
                            label="Manufacturer"                  
                            value={manufacturer}
                            onChange={handleChange}
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="model_input_id"
                            label="Model"
                            value={model}
                            onChange={handleChange}
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="fueltype_input_id"
                            label="FuelType"
                            value={fuelType}
                            onChange={handleChange}
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="colour_input_id"
                            label="Colour"
                            value={colour}
                            onChange={handleChange}
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="licenceplate_input_id"
                            label="LicencePlate"
                            value={licencePlate}
                            onChange={handleChange}
                            /* inputRef={} */
                        />

                        <FormControlLabel control={<Switch id="available_input_id"/>} label="Available" labelPlacement='start' onChange={handleChange} defaultChecked={false} value={available} />

                        <InputLabel id="branch-simple-select-label">Branch</InputLabel>
                        <Select
                        labelId="branch-simple-select-label"
                        id="branch-simple-select"
                        value={branch}
                        label="Branch"
                        onChange={handleChange}
                        >
                        </Select>

                        <InputLabel id="branch-simple-select-label">Car Type</InputLabel>
                        <Select
                        labelId="cartype-simple-select-label"
                        id="cartype-simple-select"
                        value={cartype}
                        label="Car Type"
                        onChange={handleChange}
                        >
                        </Select>
                    </div>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Container>

        </div>
    );
}