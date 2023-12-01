"use client"

function BathStats({ name, location}){
    //component for each individual review


    return (
        <div>
          <p>Bathroom: {name}</p>
          <p>location: {location}</p>
            
        </div>
    )
}

export default BathStats;