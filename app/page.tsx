import Image from 'next/image';
import { GoogleSignInButton, Signout } from "@/components/authButtons";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { authConfig } from '@/lib/auth';
import MyComponent from '@/components/map/map';
import MainComponent from '@/components/mainComponent';

export default async function Signin() {
  const session = await getServerSession(authConfig);

  return (
    <main className="black min-h-screen p-4">
      <div className="grey max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">
          FlushFindr
        </h1>
        {session && (
          <p className="text-gray-400">
            Welcome: {session?.user?.email}
          </p>
        )}
        <div className="my-4">
          {session ? <Signout /> : <GoogleSignInButton />}
        </div>
        <div className="mt-6">
          <MainComponent session={session}/>
        </div>
      </div>
    </main>
  );
}
