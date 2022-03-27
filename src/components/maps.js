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
  const [pincode, setpincodes ] = useState([]);
  const [position, setPosition] = useState([]);
    

    useEffect(()=>{
      setpincodes(props.data.data);
     

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
       
{
pincode.map((element, index)=>{
  
var config = {
    method: 'get',
    url: 'https://api.openweathermap.org/geo/1.0/zip?zip='+element.customer_pincode+',IN&appid=28b15f5ea79d947c93ec16c973407957',

  };
  
  axios(config)
  .then(function (response) {
    
    const jsonx = { lat: response.data.lat, lng: response.data.lon };
    return (
      <React.Fragment key={index}>
        <Marker position={{ lat: response.data.lat, lng: response.data.lon }} draggable={true}/>  
      </React.Fragment>
    )
   
      
       
  
  })
  .catch(function (error) {
    console.log(error);
  });
  


})}
        <></>
      </GoogleMap>
  ) : <></>
}

export default Ssax