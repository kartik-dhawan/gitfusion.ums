import prisma from "../../prisma/index.ts";
import supabase from "../../supabase/config.ts";
import {
  UmsLoginInput,
  UmsSignUpInput,
  UmsUser,
  UmsUserRole,
} from "../generated/graphql.ts";

export const userSignUpEmail = async (
  input: UmsSignUpInput
): Promise<UmsUser> => {
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

  if (error) throw error;

  return {
    email: input.email,
    firstName: input.firstName,
    id: data.user?.id!,
    lastName: input.lastName,
    username: input.username,
    role: input.role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const userLoginEmail = async (
  input: UmsLoginInput
): Promise<UmsUser> => {
  const { email, password } = input;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const user = await prisma.user.findUnique({
    where: { id: data?.user?.id },
  });

  return {
    id: user?.id ?? "",
    email: user?.email ?? "",
    username: user?.username ?? "",
    createdAt: new Date(user?.createdAt!).toISOString(),
    updatedAt: new Date(user?.updatedAt!).toISOString(),
    role: user?.role as UmsUserRole,
  };
};

export const saveUserToDatabase = async (user: UmsUser) => {
  try {
    await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    throw error;
  }
};
