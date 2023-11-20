"use client"

import Image from "next/image";
import {signIn, signOut} from "next-auth/react"
import { useRouter } from "next/navigation";

export function GoogleSignInButton(){

    const router = useRouter();
    const handleClick = async () => {

        try {
            console.log('trying to sign into google', process.env.GOOGLE_ID);
            const result = await signIn("google");
            // Handle the success scenario
            // The result will depend on how you've configured NextAuth
            // It may be a URL to redirect to, or null if the redirect is handled by NextAuth
            if (result?.error) {
                console.error("Error during sign in:", result.error);
            }
            // console.log("auth button isgnin",result)
            
            //makes a request after signin to check if user is in db

        } catch (error) {
            // Handle errors here
            console.error("Failed to sign in", error);
        }
      
    };
    return(
        <button
            onClick={handleClick}
            style={{ width: '400px', height: '50px' }}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            {/* <Image src={googleLogo} width={20} height={20}></Image> */}
            <span className="ml-4">Continue with Google</span>
        </button>
    );
}

export function Signout() {
    const handleClick = () => {
      signOut()
    };
  
    return (
      <button
        onClick={handleClick}
        style={{ width: '400px', height: '50px' }}
        className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
      >
        {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
        <span className="ml-4">Signout</span>
      </button>
    );
  }