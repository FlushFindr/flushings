"use client"

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: '800px', height: '600px' };

interface Marker {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  direction: string;
  information: {};
}

function MyComponent({ session }) {
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [markers, setMarkers] = useState<Marker[]>([]);
  const user = session
  let userID = null;
  

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }),
      (error) => console.error("Geolocation error:", error)
    );
  }, []);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLEMAPS_KEY as string,
  });

  const getPins = useCallback(async () => {
    const url = `/api/bathrooms?lat=${encodeURIComponent(center.lat)}&lng=${encodeURIComponent(center.lng)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const bathrooms = data.res;
      const bathroomMarkers = bathrooms.map(bathroom => ({
        name: bathroom.name,
        position: { lat: bathroom.latitude, lng: bathroom.longitude },
        direction: bathroom.directions,
        information: bathroom
      }));
      setMarkers(bathroomMarkers);
    } catch (error) {
      console.error("Error fetching bathrooms:", error);
    }
  }, [center]);

  useEffect(() => {
    if (center.lat !== -3.745 && center.lng !== -38.523) {
      getPins();
      checkUser();
    }
  }, [center, getPins]);

    const checkUser = async () => {
        if(user){
            console.log('checking if in db')
            const res = await fetch("api/user",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: user.user.name,
                        email: user.user.email,
                    }
                })
            })
            const parse = await res.json()
            const userDet = parse.res[0].userID
            console.log("returned should be userid",userDet)
            userID = userDet
        }else{
            console.timeLog('no need to check')
        }

    }

  const showInfo = async (marker: Marker) => {
    console.log(marker)
    try {
      const response = await fetch("api/bathStats",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: marker.name,
            lat: marker.position.lat,
            lng: marker.position.lng,
            information: marker.information,

        })
      });
      const data = await response.json();
      const reviews = data.res;
    }catch (error) {
        console.error("Error fetching bathroom stats", error);

    }
  }

  return isLoaded ? (
    <div>
      {/* <button onClick={getPins}>Get Bathrooms Nearby</button> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {markers.map((marker, index) => (
          <MarkerF key={index} position={marker.position} onClick={()=>showInfo(marker)}>
            {/* <InfoWindowF position={marker.position}>
              <div style={{ color: 'black' }}>{marker.name}</div>
            </InfoWindowF> */}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  ) : <p>Loading map...</p>;
}

export default React.memo(MyComponent);

