import prisma from "../../prisma/index.ts";
import supabase from "../../supabase/config.ts";
import { UmsSignUpInput, UmsUser } from "../generated/graphql.ts";

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
    createdAt: new Date().toISOString(),
    email: input.email,
    firstName: input.firstName,
    id: data.user?.id!,
    lastName: input.lastName,
    username: input.username,
    role: input.role,
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
