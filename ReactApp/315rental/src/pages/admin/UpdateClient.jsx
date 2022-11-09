import * as React from 'react';
import moment from 'moment';
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function UpdateClient () {
    const [DOB, setDOB] = React.useState(moment('2014-08-18T21:11:54'));
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [diverLicense, setDriverLicense] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setphoneNumber] = React.useState('');
    const [province, setProvice] = React.useState('');
    const [city, setCity] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [streetNumber, setStreetNumber] = React.useState('');
    const [streetName, setStreetName] = React.useState('');
    const [unitNumber, setUnitNumber] = React.useState('');
    const [goldMember, setGoldMember] = React.useState(false);
    

    const handleChange = (event) => {
        if(event.target.id === "DOB_id"){
            setDOB(event.target.value);
        }
        if(event.target.id === "firstName_id"){
            setFirstName(event.target.value);
        }
        if(event.target.id === "lastName_id"){
            setLastName(event.target.value);
        }
        if(event.target.id === "license_id"){
            setDriverLicense(event.target.value);
        }
        if(event.target.id === "email_id"){
            setEmail(event.target.value);
        }
        if(event.target.id === "phone_id"){
            
            setphoneNumber(event.target.value);
        }
        if(event.target.id === "province_id"){
            setProvice(event.target.value);
        }
        if(event.target.id === "city_id"){
            setCity(event.target.value);          
        }
        if(event.target.id === "postal_id"){
            setPostalCode(event.target.value);        
        }
        if(event.target.id === "streetNumber_id"){
            setStreetNumber(event.target.value);
        }
        if(event.target.id === "streetName_id"){
            setStreetName(event.target.value);
        }
        if(event.target.id === "unit_id"){
            setUnitNumber(event.target.value);
        }
        if(event.target.id === "goldMember_id"){
            setGoldMember(!event.target.checked);
        }
        /*setFrom(newValue);*/
    };
    

    const handleSubmit = (event) =>{
        event.preventDefault();

        const dOBValue = DOB;
        const firstNameValue = firstName;
        const lastNameValue = lastName;
        const diverLicenseValue = diverLicense;
        const emailValue = email;
        const phoneNumberValue = phoneNumber;
        const provinceValue = province;
        const cityValue = city;
        const postalCodeValue = postalCode;
        const streetNumberValue = streetNumber;
        const streetNameValue = streetName;
        const unitValue = unitNumber;
        const goldMemberValue = goldMember;

        console.log("submit: ", dOBValue, firstNameValue, lastNameValue, diverLicenseValue, emailValue, phoneNumberValue, provinceValue, cityValue, postalCodeValue, streetNumberValue, streetNameValue, unitValue, goldMemberValue);
       
    }
    

    return (
        <div>
            <Header/>
            <Container>
                <h1>Update Client Information</h1>
            </Container>

            <Container>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                    label="DOB"
                    id="DOB_id"
                    inputFormat="MM/DD/YYYY"
                    value={DOB}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Container>

            <Container>
                <TextField
                    required
                    id="firstName_id"
                    label="FirstName"
                    value={firstName}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="lastName_id"
                    label="LastName"
                    value={lastName}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="license_id"
                    label="DriversLicense"
                    type="number"
                    value={diverLicense}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="email_id"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="phone_id"
                    label="PhoneNum"
                    type="tel"
                    value={phoneNumber}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="province_id"
                    label="Province"
                    value={province}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="city_id"
                    label="City"
                    value={city}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="postal_id"
                    label="PostalCode"
                    value={postalCode}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="streetNumber_id"
                    label="StreetNumber"
                    type="number"
                    value={streetNumber}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="streetName_id"
                    label="StreetName"
                    value={streetName}
                    onChange={handleChange}
                    /* inputRef={} */
                />
                <TextField
                    required
                    id="unit_id"
                    label="UnitNumber"
                    type="number"
                    value={unitNumber}
                    onChange={handleChange}
                />


                <FormControlLabel control={<Switch id="goldMember_id"/>} label="GoldMember" labelPlacement='start' defaultChecked={false} onChange={handleChange} value={goldMember}/>

                
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>    
            </Container>
        </div>
    );
}