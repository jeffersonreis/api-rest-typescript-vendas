import { NextFunction, Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const updateAvatar = new UpdateUserAvatarService();

      const user = updateAvatar.execute({
        userId: request.user.id,
        avatarFilename: request.file?.filename as string,
      });

      return response.json(user);
    } catch (err) {
      next(err);
    }
  }
}
