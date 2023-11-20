import Image from 'next/image'
import { GoogleSignInButton, Signout } from "@/components/authButtons";
import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { authConfig } from '@/lib/auth';
// import { MapComponent } from "@/components/map";
import MyComponent from '@/components/map';


export default async function Signin() {
  const session = await getServerSession(authConfig);



  return (
    <main>
      <h1>
        FlushFindr

      </h1>
      {
        session &&
        <p>
          Welcome: {session?.user?.email}
        </p> 
      }
      {
        session ? <Signout /> : <GoogleSignInButton />
      }
      <MyComponent session={session}/>

      </main>
  )
}