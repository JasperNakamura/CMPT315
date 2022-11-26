import { Box, Grid, Link } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export default function Footer() {
  return (
	<footer>
      <Box 
        px={{xs: 2, sm: 5}}
        py={{xs: 2, sm: 5}}
        mt={{xs: 2, sm: 5}}
        bgcolor="#130026"
        color="white"
        >
        
        <Container maxWidth="lg" >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} mb={1}>
                <b>Company</b>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  About
                </Link>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Careers
                </Link>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Discover
                </Link>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  How we work
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} mb={1}>
                <b>Contact</b>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Help/FAQ
                </Link>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Press
                </Link>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Affiliates
                </Link>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Advertise with us
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} mb={1}>
                <b>More</b>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Car fees
                </Link>
              </Box>
              <Box>
                <Link href="/" sx={{textDecoration: 'none'}} color="inherit">
                  Cars
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{xs: 2, sm: 5}} pb={{xs: 5, sm: 1}}>
            CarGrab &reg;{new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
	</footer>
  )
}