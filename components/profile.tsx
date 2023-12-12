"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AvatarProfile from "./ui/avatar-profile"; // Assurez-vous que le chemin d'importation est correct

import type { Session } from "next-auth";

interface SpotifyUser {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  type: string;
  uri: string;
  followers: {
    href: null;
    total: number;
  };
  email: string;
}

export default function Profile({ session }: { session: Session }) {
  const [response, setResponse] = useState<SpotifyUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      headers: { Authorization: "Bearer " + session.accessToken },
    };

    axios
      .get("https://api.spotify.com/v1/me", options)
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [session.accessToken]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {response ? (
        <>
          <div className="flex">
            <AvatarProfile path={response.images[1].url} />
            <div className="w-3/4">
              <p className="text-4xl mt-8 mb-2">
                Welcome, {response.display_name} !
              </p>
              <p className="text-sm text-gray-600">
                + {response.followers.total} followers
              </p>
            </div>
          </div>
        </>
      ) : (
        <h1>Problems connecting to Spotify</h1>
      )}
    </>
  );
}
