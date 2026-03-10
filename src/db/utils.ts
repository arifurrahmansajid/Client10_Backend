import { TError, verifyToken } from "../utils/utils";
import { UserModel } from "./schema/user.schema";

export async function getCurrentUser(token?: string) {
  if (!token) return null;
  const id = verifyToken(token);
  const user = await UserModel.findById(id?.id).lean();
  if (!user) {
    TError("User does not exist", 404);
    return null;
  }
  return user;
}
export enum BackgroundTypeEnum {
  PUBLIC = "public",
  PRIVATE = "private",
}
