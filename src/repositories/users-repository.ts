import { User } from "../entities/user";

export interface UsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
