// import { NextRequest } from "next/server";
// import db from "../db"

// export async function POST(request: NextRequest){
//     try{
//         const searchParams = request.nextUrl.searchParams;
//         const lat = searchParams.get('lat');
//         const lng = searchParams.get('lng')
//         const res = await db.query(
//             `INSERT INTO restrooms (latitude, longitude)
//              SELECT ?, ?
//              FROM dual
//              WHERE NOT EXISTS (
//                  SELECT 1
//                  FROM restrooms
//                  WHERE latitude = ? AND longitude = ?
//              )`,
//             [lat, lng, lat, lng]  // Parameters are repeated as they are used twice in the query
//         );
//         // const 


//     }catch (error){

//     }
// }