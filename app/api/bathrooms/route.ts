import { NextRequest } from "next/server";
import db from "../db";
const axios = require('axios');

export async function GET(request: NextRequest) {
    //gets all the locations of bathrooms near the user
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng')

    console.log("make a rapidapi call")
    //gets the list of public bathrooms 
    const options = {
        method: 'GET',
        url: 'https://public-bathrooms.p.rapidapi.com/location',
        params: {
          lat: lat,
          lng: lng,
          page: '1',
          per_page: '10',
          offset: '0',
          ada: 'false',
          unisex: 'false'
        },
        headers: {
          'X-RapidAPI-Key': process.env.publicbathroom,
          'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
        //   console.log('bathrooms found at our location',response.data);
        const responseData = response.data;
        // console.log('first res for found bathrooms',responseData[0])
        return new Response(
          JSON.stringify({
              status:200,
              message:'found all the bathrooms',
              res: responseData,
          })
        )
      } catch (error) {
          console.error(error);
          return new Response(JSON.stringify({
            status: 500,
            message: "couldnt get the bathroom",
            error: error // Sending only the error message
          }));
      }

}



