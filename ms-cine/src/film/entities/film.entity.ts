import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./genre.entity";
import { Showtime } from "src/showtime/entities/showtime.entity";

@Entity('film')
export class Film {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'varchar', length: 50 })
  duration: string;

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @ManyToMany(() => Genre, (genre) => genre.films, { cascade: true })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Showtime, (showtime) => showtime.film)
  showTimes: Showtime[]
}
