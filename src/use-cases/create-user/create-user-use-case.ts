import { User } from "../../entities/user";
import { MailProvider } from "../../providers/MailProvider";
import { UsersRepository } from "../../repositories/users-repository";
import { CreateUserRequestDTO } from "./create-user-dto";

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mailProvider: MailProvider
  ) {}

  async execute(data: CreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do Meu App",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo à plataforma",
      body: "<p>Você já pode fazer login em nossa plataforma.</p>",
    });
  }
}
