import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class CleanupService {
  constructor(private readonly appService: AppService) {}

  // اجرای اتوماتیک هر روز ساعت 12 شب
  @Cron('0 0 0 * * *', { name: 'cleanupExpiredUrls' })
  async handleCleanup() {
    const deleted = await this.appService.cleanupExpiredUrls();
    if (deleted > 0) {
      console.log(`Deleted ${deleted} expired short URLs.`);
    }
  }
}
