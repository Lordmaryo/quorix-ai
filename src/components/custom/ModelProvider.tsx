"use client";
import React, { useEffect, useState } from "react";
import Promodal from "./Promodal";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <Promodal />
    </div>
  );
};

export default ModelProvider;
