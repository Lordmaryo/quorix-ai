"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Greeting = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [greeting, setGreeting] = useState("What can I do for you?");

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) setGreeting(isSignedIn && `Hello, ${user?.firstName}`);
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">
        {isLoaded && greeting}
      </h1>
    </div>
  );
};

export default Greeting;
