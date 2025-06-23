import { Prisma } from "../../../prisma/generated/index.js";

export type PrismaSaveUserToDbType = Prisma.UserGetPayload<{
  include: {
    roleData: {
      select: {
        Permissions: true;
      };
    };
  };
}>;
