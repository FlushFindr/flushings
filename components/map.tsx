"use client"

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";
import RatingForm from "./reviewForm";
import BathroomReview from "./bathroomReview";

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
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showRatings, setShowRating] = useState(false);
  const [userID, setUserID] = useState(null)
  const [restroomID, setRestRoomID] = useState(null)
  const user = session
  const [reviewElements, setReviewElements] = useState<JSX.Element[]>([]);

  

  useEffect(() => {
    //grabs users ip address to get bathrooms nearby for later use
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

    //gets all the bathroom locations nearby
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
        //checks to see if theres a user with the same credentials as the one in our session
        if(user){
            // console.log('checking if in db')
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

            //if whats returned isn't null we have either found or created a user, setting that as current user
            setUserID(userDet)
        }else{
            console.timeLog('no need to check')
        }

    }

  const showInfo = async (marker: Marker) => {

    try {
        //gets the bathoom stats
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
        const restroomNumber = data.res;

        //sets the current bathroom to the marker we clicked
        setRestRoomID(restroomNumber)
        if (userID !== null) {
            setShowRatingForm(true);
        }

        //using the current bathroom we set, we grab all the reviews associated with it
        const url = `/api/reviews?restroomID=${encodeURIComponent(restroomNumber)}`
        const res = await fetch(url)
        const parse = await res.json()
        const reviews = parse.res

        //reviews is the raw data, we turn the raw data reviews into review components
        const reviewArray: JSX.Element[] = []
        reviews.forEach((review)=>{
          reviewArray.push(<BathroomReview rating={review.rating} comment={review.comment} dateCreated={review.created_at}/>)
        })


        setShowRating(true)
        setReviewElements(reviewArray)
    }catch (error) {
        console.error("Error fetching bathroom stats", error);

    }
        
  }
  

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {markers.map((marker, index) => (
          <MarkerF key={index} position={marker.position} onClick={()=>showInfo(marker)}>
          </MarkerF>
        ))}
      </GoogleMap>

      {/* makes a form to input review when you click a marker */}
      {showRatingForm && userID && <RatingForm userID={userID} restroomID={restroomID}/>}

      {/* renders all the reviews of a certian marker/bathroom */}
      {showRatings && reviewElements}
    </div>
  ) : <p>Loading map...</p>;
}

export default React.memo(MyComponent);

