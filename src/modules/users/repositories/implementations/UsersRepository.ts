import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne(
      { id: user_id },
      { relations: ["games"] }
    );

    return user as User;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    const users = await this.repository.query(
      `SELECT * FROM users ORDER BY first_name`
    );

    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    const user = await this.repository.query(
      `SELECT first_name, last_name, email 
      FROM users 
      WHERE LOWER(first_name)=LOWER($1) 
      AND LOWER(last_name)=LOWER($2)`,
      [first_name, last_name]
    );

    return user;
  }
}
