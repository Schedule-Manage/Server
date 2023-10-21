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

  // FOR PLAYLIST
  async addSongToPlayList(payload: any) {
    return await this.repository.addSongToPlayList(payload);
  }

  // Add song to a specific playlist
  async addSongToSpecificPlayList(payload: any) {
    return await this.repository.addSongToSpecificPlayList(payload);
  }

  // FOR HISTORY
  async historyPlaylist(payload: any) {
    return await this.repository.historyPlaylist(payload);
  }
  // Get all song in history
  async getAllHistoryPlaylist() {
    return await this.repository.getAllHistoryPlaylist();
  }
  // Delete a song from history
  async deleteHistorySong(payload:any) {
    return await this.repository.deleteHistorySong(payload);
  }
}
