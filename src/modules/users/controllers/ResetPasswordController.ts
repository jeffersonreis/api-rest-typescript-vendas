import { NextFunction, Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { password, token } = request.body;

      const resetPassword = new ResetPasswordService();

      await resetPassword.execute({
        password,
        token,
      });

      return response.status(204).json();
    } catch (err) {
      next(err);
    }
  }
}
