import { Session } from "@supabase/supabase-js";
import prisma from "../../prisma/index.ts";
import supabase from "../../supabase/config.ts";
import {
  FetchUsersResponse,
  UmsAssignPermsInput,
  UmsGetUsersInput,
  UmsLoginInput,
  UmsLoginResponse,
  UmsPermissions,
  UmsSignUpInput,
  UmsSignUpResponse,
  UmsTokens,
  UmsUser,
  UmsUserRole,
} from "../generated/graphql.ts";
import { PrismaSaveUserToDbType } from "../utils/interfaces/prisma.ts";
import { Prisma } from "../../prisma/generated/index.js";

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

  // if there's an error while loggin in through auth service, throw & exit
  if (error) throw error;

  // once user is logged in, find that user's data from DB
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

  const userDataMapper = (us: Partial<PrismaSaveUserToDbType>): UmsUser => ({
    id: us?.id ?? "",
    email: us?.email ?? "",
    username: us?.username ?? "",
    createdAt: new Date(us?.createdAt!).toISOString(),
    updatedAt: new Date(us?.updatedAt!).toISOString(),
    role: us?.role as UmsUserRole,
    firstName: us?.firstName ?? "",
    lastName: us?.lastName ?? "",
    permissions: [],
  });

  // if that user's data doesnt exist in DB, add that to DB to handle a case of user's successful signin but error in saving to DB
  if (!user) {
    const payload: UmsUser = {
      email: session?.user.email!,
      id: session?.user.id!,
      permissions: [],
      role: session?.user.user_metadata.role as UmsUserRole,
      firstName: session?.user.user_metadata.firstName ?? "",
      lastName: session?.user.user_metadata.lastName ?? "",
      username: session?.user.user_metadata.username ?? "",
      createdAt: new Date().toISOString(),
    };

    const res = await saveUserToDatabase(payload);

    return {
      user: {
        ...userDataMapper(res),
        permissions:
          res.roleData?.Permissions.map(
            (perm) => perm.name as UmsPermissions
          ) ?? [],
      },
      token: sessionToTokenMapper(session),
    };
  }

  return {
    user: {
      ...userDataMapper({
        id: user?.id ?? "",
        email: user?.email ?? "",
        username: user?.username ?? "",
        createdAt: new Date(user?.createdAt!),
        updatedAt: new Date(user?.updatedAt!),
        role: user?.role as UmsUserRole,
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
      }),
      permissions:
        user?.roleData?.Permissions.map(
          (perm) => perm.name as UmsPermissions
        ) ?? [],
    },
    token: sessionToTokenMapper(session),
  };
};

export const saveUserToDatabase = async (
  user: UmsUser
): Promise<PrismaSaveUserToDbType> => {
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
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });
  } catch (error) {
    throw error;
  }
};
