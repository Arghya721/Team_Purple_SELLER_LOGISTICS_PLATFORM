import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, {useEffect, useState} from 'react';

import axios from 'axios';
const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 25.5377,
  lng: 85.2322
};


function Ssax(props) {

  console.log(props.coordinates);

    useEffect(()=>{
      
     
    });
  
    
    
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >


<Marker position={{ lat: parseInt(props.coordinates.lat), lng: parseInt(props.coordinates.lon) }} draggable={true}/>  


        <></>
      </GoogleMap>
  ) : <></>
}

export default Ssax