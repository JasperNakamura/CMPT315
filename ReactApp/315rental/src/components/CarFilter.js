import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';

//icons
import GradeIcon from '@mui/icons-material/Grade';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import Checkbox from '@mui/material/Checkbox';
import { Button, FormGroup } from '@mui/material';

export default function CarFilter() {
    const { useState } = React;
    const [carModelState, setCarModelState] = useState(false);
    const [ManufracturerState, setManufracturerState] = useState(false);
    const [colorState, setColorState] = useState(false);
    const [transmissionState, setTransmissionState] = useState(false);
    const [reviewState, setReviewState] = useState(false);
    const [fuelState, setFuelState] =  useState(false);
    const [driveState, setDriveState] =  useState(false);
    const [checkBoxState, setCheckbox] = useState(false);

    //different filters
    //quary base on database
    const manufacturers = ['Ford', 'Honda', 'Ram', 'Hyundai', 'Volkswagen', 'Nissan', 'Jeep', 'Kia', 'BMW', 'Dodge', 'Toyota', 'Land Rover',
        'Mazda', 'Chevrolet', 'Mercedes-Benz', 'Porsche', 'INFINITI', 'Jaguar', 'GMC', 'Subaru', 'Audi', 'Lincoln', 'Chrysler',
        'Mitsubishi', 'Cadillac', 'Lexus', 'Acura', 'Buick', 'Genesis', 'Tesla', 'Volvo', 'MINI', 'Scion', 'FIAT', 'Alda Romeo',
        'Ferrari', 'Maserati', 'McLaren', 'Suzuki'];
    const colors = ["White", "Gray", "Black", "Blue", "Red", "Green", "Orange", "Brown", "Yellow", "Purple"];
    const models = ["SUV", "Sedan", "Truck", "Coupe", "Minivan", "Hatch Back", "Wagon", "other"]
    
    const transmissionsType = ["Auto", "CVT", "Manual"];
    const fuelType = ["Gas", "Hybrid", "Diesel", "Electric"];
    const driveType = ["AWD", "4WD", "FWD", "RWD"];
    
    const [isManufacturerChecked, setIsManufacturerChecked] = React.useState(manufacturers.slice().fill(false));
    const [isColorChecked, setIsColorChecked] = React.useState(colors.slice().fill(false));
    const [isModelChecked, setIsModelChecked] = React.useState(models.slice().fill(false));
    const [isTransmissionTypeChecked, setIsTransmissionTypeChecked] = React.useState(transmissionsType.slice().fill(false));
    const [isFuelTypeChecked, setIsFuelTypeChecked] = React.useState(fuelType.slice().fill(false));
    const [isDriveTypeChecked, setIsDriveTypeChecked] = React.useState(driveType.slice().fill(false));


    const toggleCheckboxValue = (someList, index, checkState, setChecked) => {
        setChecked(checkState.map((v, i) => (i === index ? !v : v)));
        console.log(checkState[index])    
    }

    const handleFilter = () =>{
        const manufacturerValue = [];
        const colorValue =[];
        const modelValue = [];
        const transmissionValue = [];
        const fuelValue = [];
        const driveValue =[];

        fillArray(manufacturers, isManufacturerChecked, manufacturerValue);
        fillArray(colors, isColorChecked, colorValue);
        fillArray(models, isModelChecked, modelValue);
        fillArray(transmissionsType, isTransmissionTypeChecked, transmissionValue);
        fillArray(fuelType, isFuelTypeChecked, fuelValue);
        fillArray(driveType, isDriveTypeChecked, driveValue);

        getCars(manufacturerValue);
    }

    const [cars, setCars] = useState([]);

    const getCars = async (e) => {
        let j = ''
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/cars/',
            data: {
                Manufacturer: e.map((element) => `${element}`).join(',')
            }
          }).then((response) => {
            console.log(response.data);
          }, (error) => {
            console.log(error);
          });
          /*j =e.map((element) => `${element}`).join(',');
          console.log(j)*/
  }

    const fillArray = (objList, objStates, filledList) =>{
        for( let i=0; i< objStates.length; i++){
            if(objStates[i] === true){
                filledList.push(objList[i])  
            }
        }

    }
    //need constructor for filters

    return (
        <List
            sx={{ width: '100%', maxWidth: 270, bgcolor: '#fff' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader sx={{ border: '1px solid black', bgcolor: '#fff' }} component="div" id="nested-list-subheader">
                    <h2 sx={{ color: 'black' }}><b>Filter</b></h2>
                </ListSubheader>
            }
        >
            
            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setCarModelState(!carModelState)}>
                <ListItemText primary="Body Type" />
                {carModelState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={carModelState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 250, overflow: 'auto'  }}>{
                    models.map((model, index) => {
                        return(
                        <FormGroup>
                            <ListItemButton sx={{ pl: 4 }} value={model} key={index} onClick={() => toggleCheckboxValue(models,index, isModelChecked, setIsModelChecked)} >
                                <Checkbox /* add function caller here*/ key={index} checked={isModelChecked[index]} onClick={() => toggleCheckboxValue(models, index, isModelChecked, isModelChecked)}/>
                                <ListItemText primary={`${model}`} />
                            </ListItemButton>
                        </FormGroup>
                        )
                    })
                }
                </List>
            </Collapse>

            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setManufracturerState(!ManufracturerState)}>
                <ListItemText primary="Manufracturer" />
                {ManufracturerState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={ManufracturerState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 250, overflow: 'auto' } }>
                {manufacturers.map((manufacturer, index) => {
                        return(
                            <ListItemButton sx={{ pl: 4 }} value={manufacturer} key={index}  onClick={() => toggleCheckboxValue(manufacturers,index, isManufacturerChecked, setIsManufacturerChecked)} >
                            <Checkbox  key={index} checked={isManufacturerChecked[index]} onClick={() => toggleCheckboxValue(manufacturers, index, isManufacturerChecked, setIsManufacturerChecked)}/>
                            <ListItemText primary={`${manufacturer}`} />
                        </ListItemButton>
                        )
                    })}
                </List>
            </Collapse>

            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setColorState(!colorState)}>
                <ListItemText primary="Color" align="left" />
                {colorState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={colorState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 250, overflow: 'auto' }}>
                {colors.map((color, index) => {

                        return(
                            <ListItemButton sx={{ pl: 4 }} value={color} key={index}  onClick={() => toggleCheckboxValue(colors,index, isColorChecked,setIsColorChecked)} >
                            <Checkbox  key={index} checked={isColorChecked[index]} onClick={() => toggleCheckboxValue(colors, index, isColorChecked, setIsColorChecked)}/>
                            <ListItemText primary={`${color}`} />
                        </ListItemButton>
                        )
                    })}
                </List>
            </Collapse>          
            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setTransmissionState(!transmissionState)}>
                <ListItemText primary="Transmission"/>
                {colorState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={transmissionState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 250, overflow: 'auto' }}>
                {transmissionsType.map((transmission, index) => {
                        return(
                            <ListItemButton sx={{ pl: 4 }} value={transmission} key={index}  onClick={() => toggleCheckboxValue(transmissionsType,index, isTransmissionTypeChecked, setIsTransmissionTypeChecked)} >
                            <Checkbox  key={index} checked={isTransmissionTypeChecked[index]} onClick={() => toggleCheckboxValue(transmissionsType, index, isTransmissionTypeChecked, setIsTransmissionTypeChecked)}/>
                            <ListItemText primary={`${transmission}`} />
                        </ListItemButton>
                        )
                    })}
                </List>
            </Collapse>

            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setFuelState(!fuelState)}>
                <ListItemText primary="Fuel Type"/>
                {fuelState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={fuelState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 250, overflow: 'auto' }}>
                {fuelType.map((fuel, index) => {
                        return(
                            <ListItemButton sx={{ pl: 4 }} value={fuel} key={index}  onClick={() => toggleCheckboxValue(fuelType,index, isFuelTypeChecked, setIsFuelTypeChecked)} >
                            <Checkbox  key={index} checked={isFuelTypeChecked[index]} onClick={() => toggleCheckboxValue(fuelType, index, isFuelTypeChecked, setIsFuelTypeChecked)}/>
                            <ListItemText primary={`${fuel}`} />
                        </ListItemButton>
                        )
                    })}
                </List>
            </Collapse>

            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setDriveState(!driveState)}>
                <ListItemText primary="Drive Type"/>
                {driveState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={driveState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 500, overflow: 'auto' }}>
                {driveType.map((drive, index) => {
                        return(
                            <ListItemButton sx={{ pl: 4 }} value={drive} key={index}  onClick={() => toggleCheckboxValue(driveType,index, isDriveTypeChecked,setIsDriveTypeChecked)} >
                            <Checkbox  key={index} checked={isDriveTypeChecked[index]} onClick={() => toggleCheckboxValue(driveType, index, isDriveTypeChecked, setIsDriveTypeChecked)}/>
                            <ListItemText primary={`${drive}`} />
                        </ListItemButton>
                        )
                    })}
                </List>
            </Collapse>

            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setReviewState(!reviewState)}>
                <ListItemText primary="Average Customer Review" />
                {reviewState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={reviewState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff' }}>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <StarBorder></StarBorder>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <StarBorder></StarBorder>
                            <StarBorder></StarBorder>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <StarBorder></StarBorder>
                            <StarBorder></StarBorder>
                            <StarBorder></StarBorder>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <GradeIcon style={{ color: '#f4af03' }}></GradeIcon>
                            <StarBorder></StarBorder>
                            <StarBorder></StarBorder>
                            <StarBorder></StarBorder>
                            <StarBorder></StarBorder>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Collapse>
            <div>
                <Button variant="contained" sx={{backgroundColor:'#fff', color: 'black'}} fullWidth={true} onClick={handleFilter}>filter</Button>
            </div>
        </List>
    );
}
