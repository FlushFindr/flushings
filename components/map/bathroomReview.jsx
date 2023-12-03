"use client"

function BathroomReview({rating, comment, dateCreated}){
    //component for each individual review


    return (
        <div>
          <p>dateCreated: {dateCreated}</p>
          <p>rating: {rating}</p>
          <p>comment: {comment}</p>
            
        </div>
    )
}

export default BathroomReview;