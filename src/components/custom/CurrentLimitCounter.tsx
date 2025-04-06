import { MAX_FREE_COUNT } from "@/app/(dashboard)/constant";
import React from "react";

interface CurrentLimitCounterProps {
  apiLimitCount: number;
}

const CurrentLimitCounter = ({ apiLimitCount }: CurrentLimitCounterProps) => {
  return (
    <div>
      <h2 className="">Current Plan {true ? "(free tier)" : "(Premium)"}</h2>
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-muted-foreground">API Limit</div>
        <div className="text-sm font-semibold">{`${apiLimitCount} / ${MAX_FREE_COUNT}`}</div>
      </div>
    </div>
  );
};

export default CurrentLimitCounter;
