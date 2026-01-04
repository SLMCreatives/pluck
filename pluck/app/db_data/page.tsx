"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const profiles = useQuery(api.profiles.get);
  return (
    <main className="flex gap-4 flex-col items-start justify-between p-24 text-white">
      <h1 className="text-4xl font-bold">Profiles</h1>
      {profiles?.map(
        ({
          fullName,
          professionalTitle,
          bio,
          profileImage
        }: {
          fullName: string;
          professionalTitle: string;
          bio: string;
          profileImage: string;
        }) => (
          <div
            key={fullName}
            className="text-lg grid grid-cols-2 min-x-xl justify-between items-center w-full"
          >
            <div>
              <p>{fullName}</p>
              <p>{professionalTitle}</p>
              <p>{bio}</p>
            </div>
            <Image
              src={profileImage}
              alt={fullName}
              className="w-16 h-16 rounded-full"
              height={1000}
              width={1000}
            />
          </div>
        )
      )}
    </main>
  );
}
