import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CarCard(image, ) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          /*Add image here*/
          image={Card.image}
          alt="car"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Car Name
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Make into car spec grid later
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Rent
        </Button>
      </CardActions>
    </Card>
  );
}
