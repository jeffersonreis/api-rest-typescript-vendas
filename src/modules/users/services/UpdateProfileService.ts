import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Usuario nao encontrado");
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("Esse email ja esta sendo usado");
    }

    if (password && !old_password) {
      throw new AppError("Senha antiga eh necessario");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Senha antiga invalida");
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
