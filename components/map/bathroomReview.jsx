function BathroomReview({ rating, comment, dateCreated }) {
  return (
      <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
              <p className="text-sm text-gray-500">Date: {dateCreated}</p>
              <p className="font-semibold">Rating: 
                  <span className={`badge ${rating >= 4 ? 'badge-success' : 'badge-warning'}`}>{rating}</span>
              </p>
              <p className="italic">"{comment}"</p>
          </div>
      </div>
  );
}

export default BathroomReview;
