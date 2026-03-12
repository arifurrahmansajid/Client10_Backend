import { TError, verifyToken } from "../utils/utils";
import { UserModel } from "./schema/user.schema";

export async function getCurrentUser(token?: string) {
  if (!token) return null;
  try {
    const id = verifyToken(token);
    if (
      id?.id === "000000000000000000000000" ||
      id?.id === "super-admin-special-id"
    ) {
      return {
        _id: "000000000000000000000000",
        name: "Super Admin",
        email: "admin@system.local",
        roles: "admin",
        race: "System",
        gender: "Other",
        profilePic: "",
      };
    }
    const user = await UserModel.findById(id?.id).lean();
    if (!user) return null;
    return user as any;
  } catch (error) {
    return null;
  }
}
export enum BackgroundTypeEnum {
  PUBLIC = "public",
  PRIVATE = "private",
}
