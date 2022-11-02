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
        bgcolor="text.secondary"
        color="white">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <b>Help</b>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
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