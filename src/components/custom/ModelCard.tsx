"use client";
import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";

interface ModelCardProps {
  route: string;
  image: string;
  name: string;
  description: string;
}

const ModelCard = ({ route, image, name, description }: ModelCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(route)}
      className="rounded-md p-6 hover:bg-zinc-100 transition-colors cursor-pointer"
    >
      <div className="flex gap-4 items-center">
        <Image
          src={image}
          width={100}
          height={100}
          alt={name}
          priority
          className="rounded-full w-20 h-20 object-cover"
        />

        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
