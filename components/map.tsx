"use client"

import {
    GoogleMap,
    MarkerF,
    InfoWindowF,
    useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";
import { getServerSession } from 'next-auth';
import { authConfig } from "@/lib/auth";


const containerStyle = {
    width: '800px',
    height: '600px'
};


function MyComponent(props) {

    const [center, setLocation] = useState({
        lat: -3.745,
        lng: -38.523
    });
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const onSuccess = location => {
        const newLocation = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        };
    
        setLocation(newLocation);
    
        // Call getPins after setting the new location
        getPins(newLocation);
    };

    const onError = error => {
        setLocation({
            error,
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        // getPins();
    }, []);

    const session = props.session;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLMAPS_KEY as string,
    }); 

    const getPins = async (location) => {
        console.log('gettiog pins invoked in the frontend',location)

        const baseUrl = '/api/bathrooms';
        const lat = location.lat;
        const lng = location.lng;

        const url = `${baseUrl}?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;

        const pins = await fetch(url,{
            method: 'GET'
        })
        const parsing = await pins.json()
        const [...bathrooms] = parsing.rows

        console.log('returned to frontend', bathrooms)
        setMarkers([...bathrooms])
//setMarkers(currentMarkers => [...currentMarkers, newMarker]);
    }

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(15);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
        // getPins();
    }, []);

    // const onMapClick = useCallback((event) => {
    //     if(session){
    //         console.log('onclick session',session)
    //         const comment = prompt("Enter a comment for this marker:");
    //         if (comment && comment.trim()) {
    //             const newMarker = {
    //                 position: {
    //                     lat: event.latLng.lat(),
    //                     lng: event.latLng.lng()
    //                 },
    //                 comment: comment
    //             };
    //             setMarkers(currentMarkers => [...currentMarkers, newMarker]);
    //         }
    //     }else{
    //         alert("Please Sign In to Input Review")
    //     }
    // }, []);

    return isLoaded ? (
        <div>
        <button onClick={getPins}>getPins</button>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            // onClick={onMapClick}
        >
            {markers.map((marker, index) => (
                <MarkerF key={index} position={marker.position}>
                    <InfoWindowF position={marker.position}>
                        <div>{marker.comment}</div>
                    </InfoWindowF>
                </MarkerF>
            ))}
        </GoogleMap>
        
        </div>
    ) : <></>;
}

export default React.memo(MyComponent);

