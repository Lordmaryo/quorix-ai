import Image from "next/image";
import React from "react";

interface HeaderProps {
  image: string;
  title: string;
  description: string;
}

const Header = ({ image, title, description }: HeaderProps) => {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-2 px-4 ">
      <Image
        src={image}
        width={100}
        height={100}
        alt={title}
        priority
        className="rounded-full w-16 h-16 object-cover"
      />
      <h1 className="md:text-2xl text-xl font-semibold ">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Header;
