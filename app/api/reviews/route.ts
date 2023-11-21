import { NextRequest } from "next/server";
import db from "../db"

export async function POST(request: NextRequest){
    try{
        const body = await request.json();

        //body: JSON.stringify({ userID, restroomID, rating, comment }),
        const {userID, restroomID, rating, comment} = body
        console.log(userID,restroomID,rating,comment)
        const res = await db.query(
            `INSERT INTO reviews (restroomID,rating,comment,userID)
            SELECT * FROM (SELECT ? AS restroomID, ? AS rating, ? AS comment, ? AS userID) AS tmp
            WHERE NOT EXISTS (
                SELECT 1 FROM reviews WHERE restroomID = ? AND userID = ?
            ) LIMIT 1;`
        ,[restroomID,rating,comment, userID, restroomID, userID])

        const reviews = await db.query("SELECT * FROM reviews")
        console.log(reviews)


    }catch (error){

    }
}