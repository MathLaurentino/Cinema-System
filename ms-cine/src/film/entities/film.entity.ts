import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "./genre.entity";

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
}
