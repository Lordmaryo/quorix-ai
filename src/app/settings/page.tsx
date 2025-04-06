import CurrentLimitCounter from "@/components/custom/CurrentLimitCounter";
import { getUserApiLimit } from "@/lib/apiLimit";
import React from "react";

const Settings = async () => {
  const apiLimitCount = await getUserApiLimit();

  return (
    <div className="w-[440px] sm:w-[500px] lg:w-[600px] xl:w-[760px] mt-10">
      <CurrentLimitCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Settings;
