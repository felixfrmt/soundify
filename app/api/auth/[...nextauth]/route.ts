import NextAuth from "next-auth";

import Spotify from "next-auth/providers/spotify";

import type { NextAuthConfig } from "next-auth";

if (!process.env.AUTH_SPOTIFY_ID || !process.env.AUTH_SPOTIFY_SECRET) {
  throw Error("SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET is missing");
}

export const config = {
  providers: [Spotify],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },

    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAccessToken = account.expires_at;
      }
      return token;
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAccessToken = token.expiresAccessToken;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

export const { GET, POST } = handlers;
