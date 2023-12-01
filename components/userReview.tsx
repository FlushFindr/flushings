import { useState } from "react";
import RatingForm from "./reviewForm";

function UserReview({ userID, details }) {
    const { restroomName, rating, comment, restroomID } = details;

    const [edit, setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    };

    return (
        edit ? (
            <RatingForm userID={userID} restroomID={restroomID}/>
        ) : (
            <div className="card bg-base-100 shadow-xl m-4">
                <div className="card-body">
                    <h2 className="card-title">
                        Restroom: {restroomName}
                    </h2>
                    <p>
                        <strong>Rating:</strong> {rating} / 5
                    </p>
                    <p>
                        <strong>Comment:</strong> {comment}
                    </p>
                    <button className="btn btn-primary" onClick={toggleEdit}>Edit</button>
                </div>
            </div>
        )
    );
}

export default UserReview;

// "use client"
// import { useState } from "react";
// import RatingForm from "./reviewForm";

// function UserReview({ userID, details }) {
//     const { restroomName, rating, comment } = details;

//     const [edit, setEdit] = useState(false)


//     return (
//         {edit ? 
//         <div className="card bg-base-100 shadow-xl m-4">
//             <div className="card-body">
//                 <h2 className="card-title">
//                     Restroom: {restroomName}
//                 </h2>
//                 <p>
//                     <strong>Rating:</strong> {rating} / 5
//                 </p>
//                 <p>
//                     <strong>Comment:</strong> {comment}
//                 </p>
//                 <button className="btn btn-primary" onClick={setEdit(!edit)}>edit</button>
//             </div>
//         </div>
//         :
//         <RatingForm/>
//         }
//     );
// }

// export default UserReview;
