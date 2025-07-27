import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('shorten')
  shortenUrl(@Body('url') url: string) {
    // TODO: Implement URL shortening logic
    return { alias: 'example', url };
  }

  @Get(':alias')
  resolveAlias(@Param('alias') alias: string) {
    // TODO: Implement alias resolution logic
    return { alias, url: 'https://example.com' };
  }
}
