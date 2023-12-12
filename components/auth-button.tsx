import { signIn, signOut } from "@/auth";

type ChildrenProps = {
  children?: React.ReactNode;
};

export function SignIn({ children }: ChildrenProps) {
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

export function SignOut({ children }: ChildrenProps) {
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
