import { Film } from "src/film/entities/film.entity";
import { Room } from "src/room/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('showtime')
export class Showtime {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  subtitles: boolean

  @Column()
  starTime: Date

  @Column()
  endTime: Date

  @ManyToOne(() => Film, (film) => film.showTimes)
  film: Film

  @ManyToOne(() => Room, (room) => room.showTimes)
  Room: Room
}
