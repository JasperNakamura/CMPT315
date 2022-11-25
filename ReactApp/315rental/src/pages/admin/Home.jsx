import { Box } from '@mui/material'
import React from 'react'
import { Grid, Link, Paper } from "@mui/material";
import Header from "../../components/AdminHeader"
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';

export default function Home() {
    /* MUI DataTable */
    const columns = [
        { field: 'from', headerName: 'DateFrom', width: 150},
        { field: 'to', headerName: 'DateTo', width: 150},
        { field: 'returned', headerName: 'DateReturned', width: 150},
        { field: 'totalcost', headerName: 'Total Cost', width: 150},
        { field: 'license', headerName: 'License', width: 150},
        { field: 'gold', headerName: 'Gold Member', width: 150},
        { field: 'customer', headerName: 'Customer', width: 150},
        { field: 'employee', headerName: 'Employee', width: 150},
        { field: 'branchfrom', headerName: 'Branch From', width: 150},
        { field: 'branchto', headerName: 'Branch To', width: 150},
        { field: 'car', headerName: 'Car', width: 150},
        { field: 'cartype', headerName: 'Car Type', width: 150},
    ];

    const rows = [];
  
    /* Rental table data template */
    function createData(id, from, to, returned, totalcost, license, gold, customer, employee, branchfrom, branchto, car, cartype) {
        return {id, from, to, returned, totalcost, license, gold, customer, employee, branchfrom, branchto, car, cartype};
    }

    return (
        <Box>
            <Header/>

            {/* Table */}
            <Box maxWidth="sx" sx={{border: '1px solid grey', borderRadius: '1em', padding: '1em', margin: '1em'}}>
                <h1>Returned Rentals</h1>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                    </Box>
                </Paper>
            </Box>
            {/* Create Branch */}
            <Container>
                <h1>Add Branch</h1>
            </Container>
        </Box>
    )
}
