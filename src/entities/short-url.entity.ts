import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('short_urls')
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  short_code: string;

  @Column()
  original_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date | null;
}
