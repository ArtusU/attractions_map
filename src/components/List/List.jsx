import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles.js';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRef, setElRef] = useState('restaurants');
  const [elRating, setElRating] = useState('above 2.0');
  const [elRefs, setElRefs] = useState(['1']);
  const classes = useStyles();


  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);


  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dining around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
        ) : (
        <div>
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
                <PlaceDetails 
                  selected={Number(childClicked) === i} 
                  refProp={elRefs[i]} 
                  place={place} 
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>  
  );
}

export default List;
