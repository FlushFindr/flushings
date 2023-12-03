import { useState } from "react";
import RatingForm from "../map/reviewForm";
import EditReviewForm from "./editReviewForm";

function UserReview({ userID, details, onDelete }) {
    const { restroomName, rating, comment, restroomID } = details;
    console.log('each reviews details',details);
    const [restroomN, saveRestRoomName]= useState(restroomName)
    // saveRestRoomName(restroomName)
    const [ratingEdit, editRating] = useState(rating);
    const [commentEdit, editComment] = useState(comment);

    const [edit, setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    };

    const editRatingCB = (ratingP) => {
        console.log('update sate for rating',ratingP);
        editRating(ratingP)
    }
    const editCommentCB = (commentP)=>{
        console.log('update sate for comment',commentP);
        editComment(commentP)
    }

    return (
        edit ? (
            <EditReviewForm userID={userID} 
            restroomID={restroomID} 
            setEdit={setEdit} 
            editRatingCB={editRatingCB} 
            editCommentCB={editCommentCB}
            />
        ) : (
            <div className="card bg-base-100 shadow-xl m-4">
                <div className="card-body">
                    <h2 className="card-title">
                        Restroom: {restroomN}
                    </h2>
                    <p>
                        <strong>Rating:</strong> {ratingEdit} / 5
                    </p>
                    <p>
                        <strong>Comment:</strong> {commentEdit}
                    </p>
                    <h2>

                    <button 
                        className="btn btn-error small-button" 
                        onClick={() => onDelete(details.reviewID)}>
                        Delete
                    </button>

                    <button className="btn btn-primary" onClick={toggleEdit}>Edit</button>
                    </h2>
                </div>
            </div>
        )
    );
}

export default UserReview;
