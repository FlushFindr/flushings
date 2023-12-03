"use client"

import { useEffect, useState } from "react"
import UserReview from "./userReview"

function UserReviews({userID}){
    const [reviewElements, setReviewElements] = useState<JSX.Element[]>([]);
    const fetchReviews = async () => {
        const reviewsComponents = []
        const url = `/api/userReviews?userID=${userID}`
        const res = await fetch(url,{
            method:"GET"
        })
        const reviews = await res.json()
        // console.log(reviews)
        reviews.res.forEach((review, index) => {
            console.log(review);
            reviewsComponents.push(
                <UserReview key={`review-${index}`} userID={userID} details={review} />
            );
        });
        
        setReviewElements(reviewsComponents)
    }
    useEffect(()=>{
        fetchReviews();
    },[])

    return (
        <div>
            <p>Your reviews:</p>
            {reviewElements}
        </div>
    )

}

export default UserReviews;