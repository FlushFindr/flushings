// "use client"
// import React, { useState } from 'react';


// //form for inserting a review for a certain bathroom
// function RatingForm( {userID, restroomID} ) {
//     const [rating, setRating] = useState('');
//     const [comment, setComment] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const response = await fetch('api/reviews', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ userID, restroomID, rating, comment }),
//         });

//         if (response.ok) {
//             console.log('Review submitted successfully');
//             // Handle successful submission (e.g., clear form, show message)
//         } else {
//             console.error('Failed to submit review');
//             // Handle errors
//         }
//     };

//     return (
//         <div className="flex flex-col w-full border-opacity-50">
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>
//                     Rating:
//                     <input
//                         type="number"
//                         value={rating}
//                         onChange={(e) => setRating(e.target.value)}
//                         min="1"
//                         max="5"
//                         required
//                     />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     Comment:
//                     <textarea
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         required
//                     />
//                 </label>
//             </div>
//             <button className="btn btn-neutral" type="submit">Submit Review</button>
//         </form>
//         </div>
//     );
// }

// export default RatingForm;

import React, { useState } from 'react';

function RatingForm({ userID, restroomID }) {
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
            body: JSON.stringify({ userID, restroomID, rating, comment }),
        });

        if (response.ok) {
            console.log('Review submitted successfully');
            // Handle successful submission (e.g., clear form, show message)
        } else {
            console.error('Failed to submit review');
            // Handle errors
        }
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



