import { Prisma } from "../../prisma/generated/index.js";

export type PrismaSaveUserToDbType = Prisma.UserGetPayload<{
  select: {
    roleData: {
      select: {
        Permissions: true;
      };
    };
    email: true;
    firstName: true;
    lastName: true;
    username: true;
    id: true;
    createdAt: true;
    updatedAt: true;
    role: true;
  };
}>;
