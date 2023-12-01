import { NextRequest } from "next/server";
import db from "../db"

export async function POST(request: NextRequest){
    try{
        const body = await request.json();
        const {name, lat, lng, information} = body
        const roundLat = lat.toFixed(6)
        const roundLng = lng.toFixed(6)
        const location = information.street
        // console.log('received in the backend for bathstats', name, lat, lng, information)
        const res = await db.query(
            `INSERT INTO restrooms (name, latitude, longitude, location)
            SELECT * FROM (SELECT ? AS name, ? AS latitude, ? AS longitude, ? AS location) AS tmp
            WHERE NOT EXISTS (
                SELECT 1 FROM restrooms WHERE latitude = ? AND longitude = ?
            ) LIMIT 1;
            `,
            [name, roundLat, roundLng, location, roundLat, roundLng]  // Parameters are repeated as they are used twice in the query
        );
        try {
            const bathroomRet = await db.query(`
                SELECT * FROM restrooms
                WHERE restrooms.latitude=? AND restrooms.longitude=?
                `
            , [roundLat, roundLng])
    
            // console.log("heres the bathroom you clicked from the backend", bathroomRet[0][0].restroomID)
            return new Response(JSON.stringify({
                status:200,
                res: bathroomRet[0][0]
            }
            ))
        } catch (error) {
            console.log('failed to find back')
            return new Response(JSON.stringify({
                status:400,
                err: error
            }))
        }
    }catch (error){

    }
}