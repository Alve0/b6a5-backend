import AppError from "../../errors/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { tokenUtils } from "../../utils/token";

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

const login = async (data: ILogin) => {
  try {
    const result = await auth.api.signInEmail({
      body: { ...data },
    });

    const accessToken = tokenUtils.getAccessToken({
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      id: result.user.id,
    });

    const refreshToken = tokenUtils.getRefreshToken({
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      id: result.user.id,
    });

    return { ...result, accessToken, refreshToken };
  } catch (err) {
    throw new AppError(`Failed to Login \n${err}`, 404);
  }
};

export const authService = {
  register,
  login,
};
