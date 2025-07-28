import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrl } from './entities/short-url.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly shortUrlRepo: Repository<ShortUrl>,
  ) {}

  async shortenUrl(body: ShortenUrlDto) {
    const { url, expires_at, short_code } = body;

    // اعتبارسنجی حرفه‌ای با class-validator
    const dto = plainToInstance(ShortenUrlDto, body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors
          .map((e) => Object.values(e.constraints || {}).join(', '))
          .join(' | '),
      );
    }
    // جلوگیری از حملات XSS
    const sanitizedUrl = url.replace(/[<>"'`]/g, '');
    // اعتبارسنجی تاریخ انقضا (در گذشته نباشد)
    if (expires_at) {
      const date = new Date(expires_at);
      if (isNaN(date.getTime()) || date < new Date()) {
        throw new BadRequestException(
          'Expiration date is invalid or in the past',
        );
      }
    }
    // استفاده از short_code دلخواه یا تولید تصادفی
    const code = short_code || Math.random().toString(36).substring(2, 8);
    // بررسی تکراری بودن short_code
    const exists = await this.shortUrlRepo.findOne({
      where: { short_code: code },
    });
    if (exists) {
      throw new BadRequestException('Short code already exists');
    }
    const entity = this.shortUrlRepo.create({
      short_code: code,
      original_url: sanitizedUrl,
      expires_at: expires_at ? new Date(expires_at) : null,
    });
    await this.shortUrlRepo.save(entity);
    return { alias: code, url: sanitizedUrl };
  }

  async resolveAlias(alias: string) {
    const entity = await this.shortUrlRepo.findOne({
      where: { short_code: alias },
    });
    if (!entity) throw new NotFoundException('Alias not found');
    return { alias, url: entity.original_url };
  }
}
