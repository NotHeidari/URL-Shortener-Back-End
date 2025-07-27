import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrl } from './entities/short-url.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly shortUrlRepo: Repository<ShortUrl>,
  ) {}

  async shortenUrl(url: string, expires_at?: Date) {
    // Generate a random 6-character code
    const short_code = Math.random().toString(36).substring(2, 8);
    const entity = this.shortUrlRepo.create({
      short_code,
      original_url: url,
      expires_at: expires_at || null,
    });
    await this.shortUrlRepo.save(entity);
    return { alias: short_code, url };
  }

  async resolveAlias(alias: string) {
    const entity = await this.shortUrlRepo.findOne({ where: { short_code: alias } });
    if (!entity) throw new NotFoundException('Alias not found');
    return { alias, url: entity.original_url };
  }
}
