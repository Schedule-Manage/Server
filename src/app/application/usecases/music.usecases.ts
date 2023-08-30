import MusicRepository from "../../infrastructure/repository/music.repository";

export default class MusicUsecase {
  repository;

  constructor() {
    this.repository = new MusicRepository();
  }

  async upload(input: any) {
    return await this.repository.upload(input);
  }
}
