import { MAX_FREE_COUNT } from "@/app/(dashboard)/constant";

import prismaDb from "./prismadb";
import { auth } from "@clerk/nextjs/server";

export const increaseApiLimit = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismaDb.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        apiLimit: userApiLimit.apiLimit + 1,
      },
    });
  } else {
    await prismaDb.userApiLimit.create({
      data: {
        userId,
        apiLimit: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit || userApiLimit.apiLimit < MAX_FREE_COUNT) {
    return true;
  } else {
    return false;
  }
};

export const getUserApiLimit = async () => {
  const { userId } = await auth();
  if (!userId) return 0;

  const userApiLimit = await prismaDb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (!userApiLimit) return 0;

  return userApiLimit.apiLimit;
};
