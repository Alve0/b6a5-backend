import AppError from "../../errors/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const register = async (data: IRegister) => {
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userExist) {
      throw new AppError("User already exists", 409);
    }
    const result = await auth.api.signUpEmail({
      body: { ...data },
    });
    return result;
  } catch (err: any) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(err.message || "Failed to register", 500);
  }
};

export const authService = {
  register,
};
