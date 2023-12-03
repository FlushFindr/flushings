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
        // console.log("found all the reviews for the specific user", res)
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

export async function PUT(request: NextRequest){
    const body = await request.json()
    
    const {userID, restroomID, rating, comment} = body

    const updateQuery = `
    UPDATE reviews
    SET rating = ?, comment = ?
    WHERE restroomID = ? AND userID = ?;`;
    // console.log('got the request for this bathroom', restroomID)
    try {
        // console.log('trying to edit', userID, restroomID,rating, comment)
        const res = await db.query(updateQuery,[rating, comment, restroomID, userID])

        // console.log(res)
        //     `SELECT * FROM reviews
        //     WHERE reviews.userID=?`
        //     ,[userID])
        // console.log("found all the reviews for the specific user", res)
        return new Response(JSON.stringify({
            status:200,
            res: res
        }))
        
    } catch (error) {
        return new Response(JSON.stringify({
            status:400,
            err:"failed to update the bathroom"
        }))
    }
}
export async function DELETE(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const reviewID = searchParams.get('reviewID')
    // console.log('attempting to delete review',reviewID)
    const query = `DELETE FROM reviews WHERE reviewID=?`
    try {
        const res = await db.query(query,[reviewID])
        // console.log(res)
        return new Response(JSON.stringify({
            status:200,
            res:"deleted"
        }))
    } catch (error) {
        return new Response(JSON.stringify({
            status:400,
            error:"couldnt delete"
        }))
    }
}

