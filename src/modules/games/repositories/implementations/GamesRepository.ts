import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    const games = await this.repository
      .createQueryBuilder("game")
      .where("game.name=:param", { param })
      .getMany();

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    const totalGames = await this.repository.query(
      `SELECT COUNT(id) FROM games`
    );

    return totalGames;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    const users = await this.repository.createQueryBuilder().getOne();

    return [];
  }
}
