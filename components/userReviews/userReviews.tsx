"use client"

import { useEffect, useState } from "react"
import UserReview from "./userReview"

function UserReviews({userID}){
    const [reviewElements, setReviewElements] = useState<JSX.Element[]>([]);

    const handleDelete = async (reviewID) => {
        try {
            // Call API to delete review from database
            const res = await fetch(`/api/userReviews?reviewID=${reviewID}`, { method: 'DELETE' });
            if (res.ok) {
                // Remove the review from the state
                setReviewElements(prevElements => prevElements.filter(element => element.props.details.reviewID !== reviewID));
            } else {
                console.error('Failed to delete review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                <UserReview key={`review-${index}`} userID={userID} details={review} onDelete={handleDelete} />
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