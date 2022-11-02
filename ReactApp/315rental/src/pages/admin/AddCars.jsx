import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"



export default function AddCars () {
    const [branch, setBranch] = React.useState('');
    const [cartype, setCartype] = React.useState('');

    const handleChange = (event) => {
        setBranch(event.target.value);
        setCartype(event.target.value);
    };

    return (
        <div>
            <Header/>

            <Container>
                <h1>Add Cars to Database</h1>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Manufacturer"
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Model"
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="FuelType"
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Colour"
                            /* inputRef={} */
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="LicencePlate"
                            /* inputRef={} */
                        />

                        <FormControlLabel control={<Switch/>} label="Available" labelPlacement='start' />

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
                    <Button variant="contained">Submit</Button>
                </Box>
            </Container>

        </div>
    );
}