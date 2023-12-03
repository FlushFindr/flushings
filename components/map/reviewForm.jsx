

import React, { useState } from 'react';

function RatingForm({ userID, restroomID, location ,onNewReview }) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Your submit logic here
        const response = await fetch('api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, restroomID, rating, comment, location }),
        });

        const ans = await response.json()
        // console.log(ans)
        if (ans.status==200){

            onNewReview({
                rating,
                comment
            })
        }else if(ans.status==201){
            alert('You already reviewed this bathroom')
        }

        // if (response.ok) {
        //     // console.log('Review submitted successfully');
        //     // Handle successful submission (e.g., clear form, show message)
        // } else {
        //     console.error('Failed to submit review');
        //     // Handle errors
        // }
    };

    return (
        <div className="flex flex-col w-full p-4 bg-base-100 rounded-box">
            <form onSubmit={handleSubmit} className="form-control">
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Rating:</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Comment:</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary" type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default RatingForm;



