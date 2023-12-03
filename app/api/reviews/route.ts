import { NextRequest } from "next/server";
import db from "../db"

export async function POST(request: NextRequest){
    try{
        const body = await request.json();

        //body: JSON.stringify({ userID, restroomID, rating, comment }),
        const {userID, restroomID, rating, comment, location} = body
        // console.log('trying to insert this review',userID,restroomID,rating,comment)
        const res = await db.query(
            `INSERT INTO reviews (restroomID, rating, comment, userID, restroomName)
            SELECT ? AS restroomID, ? AS rating, ? AS comment, ? AS userID, ? AS restroomName
            FROM DUAL
            WHERE NOT EXISTS (
                SELECT 1 FROM reviews WHERE restroomID = ? AND userID = ?
            ) LIMIT 1;`,
            [restroomID, rating, comment, userID, location, restroomID, userID]
        );

        if (res[0].affectedRows === 0) {
            // No new row was inserted - a review by this user for this restroom already exists

            return new Response(JSON.stringify({
                status:201
            }))
  
        }
        const reviews = await db.query("SELECT * FROM reviews")

        return new Response(JSON.stringify({
            status:200,
        }))

    }catch (error){
        return new Response(JSON.stringify({
            status:400,
            err:"failed to add a review"
        }))
    }
}

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const restroomID = searchParams.get('restroomID')

    // console.log('got the request for this bathroom', restroomID)
    try {
        const res = await db.query(
            `SELECT * FROM reviews
            WHERE reviews.restroomID=?`
            ,[restroomID])
        // console.log("found all the reviews for the specific bathroom", res)
        return new Response(JSON.stringify({
            status:200,
            res: res[0]
        }))
    } catch (error) {
        return new Response(JSON.stringify({
            status:400,
            err:"failed to get review for this singular bathroom"
        }))
    }
}