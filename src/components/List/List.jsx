import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles.js';

const List = ({ type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elref, setElRef] = useState('restaurants');
  const [elrating, setElRating] = useState('above 2.0');
  const classes = useStyles();

  const places = [
    { name: 'Cool Place' },
    { name: 'Shite Den' },
    { name: 'Black Cave' },
    { name: 'Tavern of the Scull' },
  ];

  return (
    <div className={classes.container}>
    <Typography variant="h4">Food & Dining around you</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="type">Type</InputLabel>
        <Select id="type" value={type} onChange={(e) => setElRef(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="rating">Rating</InputLabel>
        <Select id="rating" value={rating} onChange={(e) => setElRating(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="3">Above 3.0</MenuItem>
          <MenuItem value="4">Above 4.0</MenuItem>
          <MenuItem value="4.5">Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places.map((place, i) => (
          <Grid key={i} item xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
      
    </div>  
  );
}

export default List;
