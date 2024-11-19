import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Film } from './film.entity';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Film, (film) => film.genres)
  films: Film[];
}