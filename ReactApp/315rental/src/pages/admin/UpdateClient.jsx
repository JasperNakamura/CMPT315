import * as React from 'react';
import moment from 'moment';
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../../components/AdminHeader"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function UpdateClient() {
    const [ID, setID] = React.useState('');
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
        if (event.target.id === "DOB_id") {
            setDOB(event.target.value);
        }
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
            setGoldMember(!event.target.checked);
        }
        /*setFrom(newValue);*/
    };

    const [allUser, setAllUser] = useState([{value: '', FirstName: '--Choose an option--', disabled: true}]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:8000/api/customers/')
                .then(res => setAllUser(res.data))
                .catch(err => console.log(err))
        }
        fetchData();

    }, []);

    function refreshPage() {
        window.location.reload(false);
      }

    const handleSubmit = async (event) => {
        const dOBValue = DOB === null ? null : DOB;
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

        axios.put('http://127.0.0.1:8000/api/customers/' + ID+'/', {
            City: cityValue,
            DOB: dOBValue,
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
            UnitNumber: unitValue
        }).then(res => {
            if(res.status === 200){
                refreshPage()
            }
        })


    }

    const [selected, setSelected] = useState('');

    const selectedName = (event) => {
        setSelected(event.target.value);
        setID(allUser[event.target.value].ID);
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
    }

    return (
        <div>
            <Header />
            <Container>
                <h1>Update Client Information</h1>
            </Container>

            <Container>
                <select onChange={selectedName} value={selected}>
                    {
                        allUser.map((element, index) =>
                        <option value={index} key={element.FirstName} disabled={element.disabled}>{element.FirstName}</option >
                        )
                    }
                </select>
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
                    value={unitNumber}
                    onChange={handleChange}
                />


                <FormControlLabel control={<Switch id="goldMember_id" />} label="GoldMember" labelPlacement='start' defaultChecked={false} onChange={handleChange} value={goldMember} />

                <div >
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </Container>
        </div>
    );
}