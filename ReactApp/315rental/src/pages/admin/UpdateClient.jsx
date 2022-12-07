import * as React from 'react';
import { Box, Button, Card, CssBaseline, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment'

export default function UpdateClient() {
    const [ID, setID] = React.useState('');
    const [DOB, setDOB] = React.useState('');
    const [calDate, setcalDate] = React.useState(null);
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
    const [banned, setBanned] = React.useState(false);

    const handleChange = (event) => {
        if (event.target !== undefined) {
            if (event.target.id === "firstName_id") {
            setFirstName(event.target.value);
            }
            if (event.target.id === "lastName_id") {
                setLastName(event.target.value);
            }
            if (event.target.id === "license_id") {
                setDriverLicense(event.target.value);
            }
            if (event.target.id === "email_id") {
                setEmail(event.target.value);
            }
            if (event.target.id === "phone_id") {
                setphoneNumber(event.target.value);
            }
            if (event.target.id === "province_id") {
                setProvice(event.target.value);
            }
            if (event.target.id === "city_id") {
                setCity(event.target.value);
            }
            if (event.target.id === "postal_id") {
                setPostalCode(event.target.value);
            }
            if (event.target.id === "streetNumber_id") {
                setStreetNumber(event.target.value);
            }
            if (event.target.id === "streetName_id") {
                setStreetName(event.target.value);
            }
            if (event.target.id === "unit_id") {
                setUnitNumber(event.target.value);
            }
            if (event.target.id === "goldMember_id") {
                setGoldMember(event.target.checked);
            }
            if (event.target.id === "banned_id") {
                setBanned(event.target.checked);
            }
        }
        
        else {
            setcalDate(event);
            setDOB(event._d.toLocaleString());
        }
    };

    const [allUser, setAllUser] = useState([{value: '', FirstName: '--Choose an option--', disabled: true}]);

    const getCustomers = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/customers/`)
          if (response.length > 0 || response.data !== undefined) {
            setAllUser(response.data)
          }
        } catch (error) {
            console.log(error);
      }  
    }

    useEffect(() => {
        getCustomers();
    }, []);

    const handleSubmit = async (event) => {
        let dobString = DOB === null ? null : DOB;
        const dobValue = moment(dobString).format("YYYY-MM-DD")
        console.log(dobValue);
        const firstNameValue = firstName === null ? null : firstName;
        const lastNameValue = lastName === null ? null : lastName;
        const diverLicenseValue = diverLicense === null ? null : diverLicense;
        const emailValue = email === null ? null : email;
        const phoneNumberValue = phoneNumber === null ? null : phoneNumber;
        const provinceValue = province === null ? null : province;
        const cityValue = city === null ? null : city;
        const postalCodeValue = postalCode === null ? null : postalCode;
        const streetNumberValue = streetNumber === null ? null : streetNumber;
        const streetNameValue = streetName === null ? null : streetName;
        const unitValue = unitNumber === null ? null : unitNumber;
        const goldMemberValue = goldMember === null ? null : goldMember;
        const bannedValue = banned === null ? null : banned;

        axios.put('http://127.0.0.1:8000/api/customers/' + ID+'/', {
            City: cityValue,
            DOB: dobValue,
            DriversLicense: diverLicenseValue,
            Email: emailValue,
            FirstName: firstNameValue,
            GoldMember: goldMemberValue,
            LastName: lastNameValue,
            PhoneNum: phoneNumberValue,
            PostalCode: postalCodeValue,
            Province: provinceValue,
            StreetName: streetNameValue,
            StreetNumber: streetNumberValue,
            UnitNumber: unitValue,
            Banned: bannedValue,
        }).then(res => {
            if(res.status === 200){
                getCustomers()
            }
        })
    }

    const [selected, setSelected] = useState('');

    const selectedName = (event) => {
        setSelected(event.target.value);
        setID(allUser[event.target.value].ID);
        setcalDate(allUser[event.target.value].DOB);
        setDOB(allUser[event.target.value].DOB);
        setFirstName(allUser[event.target.value].FirstName);
        setLastName(allUser[event.target.value].LastName);
        setDriverLicense(allUser[event.target.value].DriversLicense);
        setEmail(allUser[event.target.value].Email);
        setphoneNumber(allUser[event.target.value].PhoneNum);
        setProvice(allUser[event.target.value].Province);
        setCity(allUser[event.target.value].City);
        setPostalCode(allUser[event.target.value].PostalCode);
        setStreetNumber(allUser[event.target.value].StreetNumber);
        setStreetName(allUser[event.target.value].StreetName);
        setUnitNumber(allUser[event.target.value].UnitNumber);
        setGoldMember(allUser[event.target.value].GoldMember);
        setBanned(allUser[event.target.value].Banned);
    }

    return (
        <Box sx={{backgroundColor: '#21033a', minHeight: '100vh'}}>
            <CssBaseline/>
            <Header />
            <Container>
                <h1 style={{color: 'white'}}>Update Client Information</h1>
                
                <Card sx={{padding: '2em'}}>
                    <Grid container spacing={0} mt={3} mb={3} justifyContent="center">
                        <Grid item xs={3}>
                            <select onChange={selectedName} value={selected}>
                                <option value="" disabled={true}>
                                    --Choose Client--
                                </option>
                                {
                                    allUser.map((element, index) =>
                                    <option value={index} key={element.FirstName}>{element.FirstName} {element.LastName}</option >
                                    )
                                }
                            </select>   
                        </Grid>
                    </Grid>


                    <Grid container spacing={0} mt={3} mb={3} justifyContent="center">
                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    label="DOB"
                                    id="DOB_id"
                                    inputFormat="YYYY/MM/DD"
                                    disableFuture
                                    value={calDate}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />   
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <TextField
                        sx={{m: 2}}
                        required
                        id="firstName_id"
                        label="FirstName"
                        value={firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="lastName_id"
                        label="LastName"
                        value={lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="license_id"
                        label="DriversLicense"
                        type="number"
                        value={diverLicense}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="email_id"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="phone_id"
                        label="PhoneNum"
                        type="tel"
                        value={phoneNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="province_id"
                        label="Province"
                        value={province}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="city_id"
                        label="City"
                        value={city}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="postal_id"
                        label="PostalCode"
                        value={postalCode}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="streetNumber_id"
                        label="StreetNumber"
                        value={streetNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="streetName_id"
                        label="StreetName"
                        value={streetName}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{m: 2}}
                        required
                        id="unit_id"
                        label="UnitNumber"
                        value={unitNumber}
                        onChange={handleChange}
                    />

                    <FormControlLabel sx={{m: 2}} control={<Switch id="goldMember_id" checked={goldMember}/>} label="GoldMember" labelPlacement='start'  onChange={handleChange} />

                    <FormControlLabel sx={{m: 2}} control={<Switch id="banned_id" checked={banned}/>} label="Banned" labelPlacement='start'  onChange={handleChange} />

                    <Grid container spacing={0} justifyContent="center">
                        <Grid item xs={3}>
                            <Button sx={{p: 2, m: 2, width: '250px', minWidth: '8vw'}} variant="contained" onClick={handleSubmit}>Submit</Button>
                        </Grid>   
                    </Grid> 
                </Card>
            </Container>
        </Box>
    );
}