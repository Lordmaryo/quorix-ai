"use client";

import React from "react";
import { UseGlobalStore } from "@/app/hooks/useGlobalStore";
import { Card, CardContent } from "../ui/card";

const Suggestions = () => {
  const suggesttions = [
    "I have an essay coming up and i dont know how to start.",
    "Write an email to my boss about my promotion.",
    "Write a fictional story about a super hero who has super powers.",
    "Write a poem about the beauty of nature",
  ];

  const { setSuggestedPrompt } = UseGlobalStore();

  return (
    <div className="mt-10">
      {suggesttions.map((suggestion, index) => (
        <Card
          onClick={() => {
            setSuggestedPrompt(suggestion);
          }}
          key={index}
          className="my-4 cursor-pointer hover:opacity-85 transition"
        >
          <CardContent>{suggestion}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Suggestions;
