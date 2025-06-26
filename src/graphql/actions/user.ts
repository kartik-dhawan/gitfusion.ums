import { Prisma } from "../../prisma/generated/index.js";
import prisma from "../../prisma/index.ts";
import supabase from "../../supabase/config.ts";
import {
  UmsGetUsersInput,
  FetchUsersResponse,
  UmsUser,
  UmsUserRole,
  UmsPermissions,
  UmsAssignPermsInput,
} from "../generated/graphql.ts";

export const fetchUsersFromDatabase = async (
  input: UmsGetUsersInput
): Promise<FetchUsersResponse> => {
  const { pagination, search } = input; // search is by name only
  const { pageNumber = 1, pageSize = 10 } = pagination || {};

  // query to filter data
  const query: Prisma.UserWhereInput | undefined = search
    ? {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : undefined;

  const usersData = await prisma.user.findMany({
    include: {
      roleData: {
        include: {
          Permissions: {
            select: { name: true },
          },
        },
      },
    },
    where: query,
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  const users: UmsUser[] = usersData.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: new Date(user.createdAt!).toISOString(),
    updatedAt: new Date(user.updatedAt!).toISOString(),
    role: user.role as UmsUserRole,
    permissions: user.roleData.Permissions.map(
      (perm) => perm.name as UmsPermissions
    ),
  }));

  return {
    // explicitly counting total users matching the query, excluding pagination
    totalCount: await prisma.user.count({
      where: query,
    }),
    users: users,
  };
};

export const assignPermissionsToRole = async (
  payload: UmsAssignPermsInput
): Promise<UmsPermissions[]> => {
  const { permissions, roleAlias } = payload;

  await prisma.permissions.createMany({
    data: permissions.map((permission) => ({
      name: permission,
    })),
    skipDuplicates: true,
  });

  const perms = await prisma.roles.update({
    where: { alias: roleAlias },
    data: {
      Permissions: {
        connect: permissions.map((permission) => ({
          name: permission,
        })),
      },
    },
    select: {
      Permissions: true,
    },
  });

  return perms.Permissions.map((perm) => perm.name as UmsPermissions);
};

export const deleteUserFromDatabase = async (userId: string): Promise<void> => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

export const deleteUserFromSupabase = async (userId: string): Promise<void> => {
  await supabase.auth.admin.deleteUser(userId);
};
