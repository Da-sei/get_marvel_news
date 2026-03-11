import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getNews(): Promise<string> {
    try {
      // RSSフィード取得処理
      const url = 'https://news.google.com/rss/search?q=marvel&hl=ja&gl=JP&ceid=JP:ja';
      const response = await fetch(url);

      if (!response) {
        throw new Error('エラーが発生しました。');
      }

      const xmlData = await response.text();
      return xmlData;
    } catch (error) {
      console.log('取得失敗。', error);
      throw error;
    }
  }
}
