import Header from "../components/Header";
import "./css/Normalize.css"
import Footer from "../components/Footer";
import Box from '@mui/material/Box';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Cars = () => {
    const cardInfo = [
        {image: "", CarName: "", CarDetails: "" },
        {image: "", CarName: "", CarDetails: "" },
        {image: "", CarName: "", CarDetails: "" },
        {image: "", CarName: "", CarDetails: "" },
    ]

    const renderCard = (card, index) => {
        return (
            <Card sx={{ maxWidth: 345 }} key={index}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              /*Add image here*/
              image={card.image}
              alt="car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.CarName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.CarDetails}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Rent
            </Button>
          </CardActions>
        </Card>
        )
    }

    return (
        <div>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"header header header header"
                "sidebar main main main"
                "footer footer footer footer"`,
                }}>
                <Box sx={{ gridArea: 'header'}}><Header/></Box>
                <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main' }}>
                    {cardInfo.map(renderCard)}
                </Box>
                <Box sx={{ gridArea: 'sidebar', bgcolor: 'error.main' }}>Filter Area</Box>
                <Box sx={{ gridArea: 'footer'}}><Footer/></Box>
            </Box>
        </div>
    );
}

export default Cars

