function BathStats({ name, location, avgRating }) {
  return (
      <div className="card bordered">
          <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <p>Location: <span className="text-info">{location}</span></p>
              <p>Average Rating: <span className={`badge ${avgRating >= 4 ? 'badge-success' : 'badge-warning'}`}>{avgRating}</span></p>
          </div>
      </div>
  );
}

export default BathStats;