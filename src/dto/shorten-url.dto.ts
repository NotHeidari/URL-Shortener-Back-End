import { IsString, IsOptional, IsUrl, Length, Matches, IsDateString, MaxLength } from 'class-validator';

export class ShortenUrlDto {
  @IsString()
  @IsUrl({ require_tld: true }, { message: 'URL format is invalid' })
  @MaxLength(2048)
  url: string;

  @IsOptional()
  @IsString()
  @Length(3, 32)
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'Short code contains invalid characters' })
  short_code?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Expiration date must be a valid ISO date string' })
  expires_at?: string;
}
