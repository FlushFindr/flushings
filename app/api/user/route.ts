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
    console.log("received in the server POST", request.body);

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      status: 500,
      message: "Database connection error",
      error: error // Sending only the error message
    }));
  }
}
