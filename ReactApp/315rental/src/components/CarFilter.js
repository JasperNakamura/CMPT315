import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

//icons
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import GradeIcon from '@mui/icons-material/Grade';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { alignProperty } from '@mui/material/styles/cssUtils';

export default function CarFilter() {
    const { useState } = React;
    const [carModelState, setCarModelState] = useState(false);
    const [ManufracturerState, setManufracturerState] = useState(false);
    const [colorState, setColorState] = useState(false);
    const [transmissionState, setTransmissionState] = useState(false);
    const [reviewState, setReviewState] = useState(false);
    const [fuelState, setFuelState] =  useState(false);
    const [driveState, setDriveState] =  useState(false);

    //different filters
    const manufacturers = ['Ford', 'Honda', 'Ram', 'Hyundai', 'Volkswagen', 'Nissan', 'Jeep', 'Kia', 'BMW', 'Dodge', 'Toyota', 'Land Rover',
        'Mazda', 'Chevrolet', 'Mercedes-Benz', 'Porsche', 'INFINITI', 'Jaguar', 'GMC', 'Subaru', 'Audi', 'Lincoln', 'Chrysler',
        'Mitsubishi', 'Cadillac', 'Lexus', 'Acura', 'Buick', 'Genesis', 'Tesla', 'Volvo', 'MINI', 'Scion', 'FIAT', 'Alda Romeo',
        'Ferrari', 'Maserati', 'McLaren', 'Suzuki'];
    const colors = ["White", "Gray", "Black", "Blue", "Red", "Green", "Orange", "Brown", "Yellow", "Purple"];
    const models = ["SUV", "Sedan", "Truck", "Coupe", "Minivan", "Hatch Back", "Wagon", "other"]
    const transmissionsTyp = ["Auto", "CVT", "Manual"];
    const fuelType = ["Gas", "Hybrid", "Diesel", "Electric"];
    const driveType = ["AWD", "4WD", "FWD", "RWD"];
    


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
                <List component="div" disablePadding sx={{ bgcolor: '#fff' }} >
                {models.map(model => {
                        return(
                            <ListItemButton sx={{ pl: 4 }}>
                            <Checkbox /* add function caller here*/ />
                            <ListItemText primary={`${model}`} />
                        </ListItemButton>
                        )
                    })}
                </List>
            </Collapse>

            <ListItemButton sx={{ border: '1px solid black' }} onClick={() => setManufracturerState(!ManufracturerState)}>
                <ListItemText primary="Manufracturer" />
                {ManufracturerState ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={ManufracturerState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 500, overflow: 'auto' } }>
                    {manufacturers.map(maker => {
                        return(
                            <ListItemButton sx={{ pl: 4 }}>
                            <Checkbox /* add function caller here*/ />
                            <ListItemText primary={`${maker}`} />
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
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 500, overflow: 'auto' }}>
                {colors.map(color => {
                        return(
                            <ListItemButton sx={{ pl: 4 }}>
                            <Checkbox /* add function caller here*/ />
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
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 500, overflow: 'auto' }}>
                {transmissionsTyp.map(transmission => {
                        return(
                            <ListItemButton sx={{ pl: 4 }}>
                            <Checkbox /* add function caller here*/ />
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
                <List component="div" disablePadding sx={{ bgcolor: '#fff', maxHeight: 500, overflow: 'auto' }}>
                {fuelType.map(fuel => {
                        return(
                            <ListItemButton sx={{ pl: 4 }}>
                            <Checkbox /* add function caller here*/ />
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
                {driveType.map(drive => {
                        return(
                            <ListItemButton sx={{ pl: 4 }}>
                            <Checkbox /* add function caller here*/ />
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

        </List>
    );
}
