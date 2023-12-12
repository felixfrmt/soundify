import NextAuth from "next-auth";

import Spotify from "next-auth/providers/spotify";

import type { NextAuthConfig } from "next-auth";

if (!process.env.AUTH_SPOTIFY_ID || !process.env.AUTH_SPOTIFY_SECRET) {
  throw Error("SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET is missing");
}

const scopes = [
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-follow-read",
  "playlist-read-private",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "playlist-read-collaborative",
];

export const config = {
  providers: [
    Spotify({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-currently-playing,user-read-recently-played,user-top-read,user-read-email",
    }),
  ],
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
