import React, {useEffect, useState} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { GetPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';




const App = () => {
  const [type, setType] = useState('attractions');
  const [rating, setRating] = useState('');

  const[coordinates, setCoordinates] = useState({});
  const[bounds, setBounds] = useState(null)
  
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const[places, setPlaces] = useState([]);

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      GetPlacesData(type, bounds.sw, bounds.ne)
      .then((data) =>{
        console.log(data)
        setPlaces(data);
        setFilteredPlaces([])
        setIsLoading(false);
      });
    }
  }, [type, coordinates, bounds]);   

  return (
    <div>
      <CssBaseline />
      <Header/>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          /> 
        </Grid>
      </Grid>
    </div>
  );
}

export default App;