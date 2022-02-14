import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from "date-fns";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("Token inexistente");
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("Usuario inexistente");
    }

    // verificar validade do token
    const tokenCreatedAt = userToken.created_at;

    // soma 2 horas a sua criacao
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expirado");
    }

    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;
