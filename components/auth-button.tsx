import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route";

export function SignIn({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <form
        action={async () => {
          "use server";
          await signIn("spotify");
        }}
      >
        <button className="login">Sign In</button>
      </form>
    </>
  );
}

export function SignOut({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className="login"
          style={{ backgroundColor: "#2b2b2b", color: "white" }}
        >
          Sign Out
        </button>
      </form>
    </>
  );
}
