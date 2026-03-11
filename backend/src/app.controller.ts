import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  // ✅ ここも Promise<string[]> に変更
  async get(): Promise<string> {
    const result = await this.appService.getNews();
    return result; // ✅ 配列をそのまま返す
  }
}
