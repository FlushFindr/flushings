import { NextRequest } from "next/server";
import db from '../db'

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const userID = searchParams.get('userID')
    // console.log('got the request for this bathroom', restroomID)
    try {
        const res = await db.query(
            `SELECT * FROM reviews
            WHERE reviews.userID=?`
            ,[userID])
        console.log("found all the reviews for the specific user", res)
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