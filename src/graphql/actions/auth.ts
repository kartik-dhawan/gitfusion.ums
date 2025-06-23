import { Session } from "@supabase/supabase-js";
import prisma from "../../prisma/index.ts";
import supabase from "../../supabase/config.ts";
import {
  UmsAssignPermsInput,
  UmsLoginInput,
  UmsLoginResponse,
  UmsPermissions,
  UmsSignUpInput,
  UmsSignUpResponse,
  UmsTokens,
  UmsUser,
  UmsUserRole,
} from "../generated/graphql.ts";

const sessionToTokenMapper = (session?: Session | null): UmsTokens => ({
  accessToken: session?.access_token ?? "",
  refreshToken: session?.refresh_token ?? "",
  expiration: session?.expires_in ?? 0,
  expiresIn: session?.expires_in ?? 0,
  providerToken: session?.provider_token ?? "",
  providerRefreshToken: session?.provider_refresh_token ?? "",
  tokenType: session?.token_type ?? "",
});

export const userSignUpEmail = async (
  input: UmsSignUpInput
): Promise<UmsSignUpResponse> => {
  const { email, password, ...rest } = input;

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        ...rest,
      },
    },
  });

  const { session } = data;

  if (error) throw error;

  return {
    user: {
      email: input.email,
      firstName: input.firstName,
      id: session?.user?.id!,
      lastName: input.lastName,
      username: input.username,
      role: input.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: [], // Permissions are not assigned during signup
    },
    token: sessionToTokenMapper(session),
  };
};

export const userLoginEmail = async (
  input: UmsLoginInput
): Promise<UmsLoginResponse> => {
  const { email, password } = input;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const { session } = data;

  if (error) throw error;

  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: {
      roleData: {
        select: {
          Permissions: true,
        },
      },
    },
  });

  return {
    user: {
      id: user?.id ?? "",
      email: user?.email ?? "",
      username: user?.username ?? "",
      createdAt: new Date(user?.createdAt!).toISOString(),
      updatedAt: new Date(user?.updatedAt!).toISOString(),
      role: user?.role as UmsUserRole,
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      permissions:
        user?.roleData?.Permissions.map(
          (perm) => perm.name as UmsPermissions
        ) ?? [],
    },
    token: sessionToTokenMapper(session),
  };
};

export const saveUserToDatabase = async (user: UmsUser) => {
  try {
    return await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roleData: {
          connect: {
            alias: user.role,
          },
        },
      },
      select: {
        roleData: {
          select: {
            Permissions: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
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
