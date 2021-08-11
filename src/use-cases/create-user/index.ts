import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/postgres-users-repository";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-user-use-case";

const mailtrapProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();
const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapProvider
);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
