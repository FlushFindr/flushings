// pages/api/test-db.js
import { NextRequest } from "next/server";
import db from "../db";

export async function GET(request: NextRequest) {
  try {
    const res = await db.query("SELECT * FROM users");
    return new Response(
      JSON.stringify({
        status: 200,
        message: "Database connected",
        res: res.rows
      }))
  } catch (error) {
    // console.error(error);/
    return new Response(JSON.stringify({
      status: 500,
      message: "Database connection error",
      error: error // Sending only the error message
    }));
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // console.log('Received in the server POST', body.user.email);
    // const email
    const res = await db.query(
      `INSERT INTO users(email) VALUES(?) ON DUPLICATE KEY UPDATE email=email`,
      [body.user.email]
    );
    const user = await db.query(`SELECT * FROM users WHERE users.email=?`,
    [body.user.email]
    );

    console.log('after inserting',user[0])
    return new Response(JSON.stringify({
      status:200,
      res: user[0],
    }))
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      status: 500,
      message: "Database connection error",
      error: error // Sending only the error message
    }));
  }
}
