import MusicRepository from "../../infrastructure/repository/music.repository";

export default class MusicUsecase {
  repository;

  constructor() {
    this.repository = new MusicRepository();
  }

  async upload(input: any) {
    return await this.repository.upload(input);
  }

  async getMusic() {
    return await this.repository.getMusic();
  }

  async historyPlaylist(payload: any) {
    return await this.repository.historyPlaylist(payload);
  }

  async addSongToPlayList(payload: any){
    return await this.repository.addSongToPlayList(payload);
  }
}
