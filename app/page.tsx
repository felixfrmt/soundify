import { SignIn, SignOut } from "@/components/auth-button";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth();

  const message = (
    <p className="text-4xl mt-8 mb-8 w-2/5">
      Connect to Spotify to see your stats and play with your friends.
    </p>
  );

  return (
    <main className="page">
      {session ? (
        <>
          <SessionProvider session={session} refetchInterval={5 * 60}>
            <Profile session={session} />
          </SessionProvider>
          <SignOut />
        </>
      ) : (
        <SignIn>{message}</SignIn>
      )}
    </main>
  );
}
