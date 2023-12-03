"use client"

import React, { useState, useEffect } from "react";
import Map from "./map/map"; // assuming MyComponent is the correct import
import UserReviews from "./userReviews/userReviews";

function MainComponent({ session }) {
    const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
    const [userID, setUserID] = useState(null);
    const [showReviews, setShowReviews] = useState(false)
    const user = session

    useEffect(() => {
        // Check user and update userID here if needed
        // For example, call a function to check the user and set userID
        checkUser()
    }, [session]);

    // Geolocation logic can also be moved here if it affects other parts of your application
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
            console.log('no need to check')
        }

    }
    const getReviews = async () => {
        setShowReviews(!showReviews)
    }

    return (
        <div>
            {showReviews ? <button onClick={getReviews}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
            >Show Map</button> 
            : <button onClick={getReviews}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
            >Your Reviews</button>}
            {showReviews ? <UserReviews userID={userID}/> : <Map center={center} userID={userID}/> }
        </div>
    );
}

export default MainComponent;
