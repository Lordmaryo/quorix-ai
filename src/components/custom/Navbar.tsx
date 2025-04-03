"use client";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center gap-4">
      <UserButton />
      <SignedOut>
        <div className="cursor-pointer bg-black text-white p-2 rounded-md">
          <SignInButton mode="modal" fallbackRedirectUrl="/" />
        </div>
        <SignUpButton mode="modal" fallbackRedirectUrl="/" />
      </SignedOut>
    </div>
  );
};

export default Navbar;
