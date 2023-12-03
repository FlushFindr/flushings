"use client"

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from "@react-google-maps/api";
import RatingForm from "./reviewForm";
import BathroomReview from "./bathroomReview";
import BathStats from "./bathStats";

const containerStyle = { width: '800px', height: '600px', borderRadius: '30px' };

// interface Marker {
//   name: string;
//   position: {
//     lat: number;
//     lng: number;
//   };
//   direction: string;
//   information: {};
// }

function Map({ center, userID }) {
  const [markers, setMarkers] = useState([]);
  // const [markers, setMarkers] = useState<Marker[]>([]);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showRatings, setShowRating] = useState(false);
  const [restroomID, setRestRoomID] = useState(null)
  const [restroomLocation, setRestroomLocation] = useState(null)
  const [reviewElements, setReviewElements] = useState([]);
  const [bathStatElements, setBathStatsElements] = useState([]);
  // const [reviewElements, setReviewElements] = useState<JSX.Element[]>([]);
  // const [bathStatElements, setBathStatsElements] = useState<JSX.Element>();



  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_KEY,

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
      // checkUser();
    }
  }, [center, getPins]);


  const showInfo = async (marker) => {

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
        setRestRoomID(restroomNumber.restroomID)
        setRestroomLocation(restroomNumber.location)
        const bathStats = <BathStats name={restroomNumber.name} location={restroomNumber.location}/>
        // console.log('bathrstats in the front', restroomNumber)
        if (userID !== null) {
            setShowRatingForm(true);
        }

        //using the current bathroom we set, we grab all the reviews associated with it
        const url = `/api/reviews?restroomID=${encodeURIComponent(restroomNumber.restroomID)}`
        const res = await fetch(url)
        const parse = await res.json()
        const reviews = parse.res

        //reviews is the raw data, we turn the raw data reviews into review components
        const reviewArray = []
        reviews.forEach((review, index)=>{
          reviewArray.push(<BathroomReview key={`review-${index}`} rating={review.rating} comment={review.comment} dateCreated={review.created_at}/>)
        })
        setBathStatsElements(bathStats)
        setReviewElements(reviewArray)
        setShowRating(true)

    }catch (error) {
        console.error("Error fetching bathroom stats", error);

    }
        
  }
  const addNewReview=(newReview)=>{
    setReviewElements(prevReviews => [
      ...prevReviews,
      <BathroomReview
        key={`review-${prevReviews.length}`}
        rating={newReview.rating}
        comment={newReview.comment}
        dateCreated={new Date().toISOString()} // Assuming you want to set the current date as the creation date
      />
    ]);
  }
  

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {markers.map((marker, index) => (
          <MarkerF key={index} position={marker.position} onClick={()=>showInfo(marker)}>
          </MarkerF>
        ))}
      </GoogleMap>

      {/* makes a form to input review when you click a marker */}
      {showRatings && bathStatElements}
      {showRatings && reviewElements}
      {showRatingForm && userID && (
        <RatingForm userID={userID} location={restroomLocation} restroomID={restroomID} onNewReview={addNewReview} />
      )}

      {/* renders all the reviews of a certian marker/bathroom */}
    </div>
  ) : <p>Loading map...</p>;
}

export default Map;

