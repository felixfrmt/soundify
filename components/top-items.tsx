"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "./ui/images"; // Assurez-vous que le chemin d'importation est correct

import type { Session } from "next-auth";

interface ImageObject {
  url: string;
  height: number;
  width: number;
}

interface ArtistObject {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface SpotifyUserTopArtists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null | string;
  total: number;
  items: ArtistObject[];
}

export default function TopItems({ session }: { session: Session }) {
  const [response, setResponse] = useState<SpotifyUserTopArtists>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    };

    axios
      .get(
        "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=12",
        options
      )
      .then((res) => {
        console.log("Response:", res);
        setResponse(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [session.accessToken]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <p className="text-3xl font-medium mt-4 mb-8">Top artists</p>
      {response ? (
        <div className="flex flex-wrap gap-6">
          {response.items.map((item) => (
            <div key={item.id}>
              <div className="flex">
                <Image
                  url={item.images[0].url}
                  fallbackUrl="./default-album.png" // Remplacez cela par le chemin de votre image de fallback
                  alt={item.name}
                  key={item.id}
                  className="rounded-3xl"
                  width={220}
                  height={220}
                />
              </div>
              <p className="text-xl font-medium text-gray-600 m-4">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h1>Problems getting your top artists</h1>
      )}
    </>
  );
}
