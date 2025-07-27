import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Shorten')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('shorten')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://example.com' },
        expires_at: { type: 'string', format: 'date-time', example: '2025-12-31T23:59:59Z', nullable: true },
      },
      required: ['url'],
    },
    description: 'URL to shorten and optional expiration date',
  })
  @ApiResponse({ status: 201, description: 'Shortened URL', schema: {
    type: 'object',
    properties: {
      alias: { type: 'string', example: 'abc123' },
      url: { type: 'string', example: 'https://example.com' },
    }
  }})
  async shortenUrl(@Body('url') url: string, @Body('expires_at') expires_at?: Date) {
    return this.appService.shortenUrl(url, expires_at);
  }

  @Get(':alias')
  async resolveAlias(@Param('alias') alias: string) {
    return this.appService.resolveAlias(alias);
  }
}
