import { Film } from "src/film/entities/film.entity";
import { Room } from "src/room/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('showtime')
export class Showtime {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  subtitles: boolean
  
  @Column({nullable: true})
  subtitlesLenguage: string

  @Column()
  startTime: Date

  @Column()
  endTime: Date

  @ManyToOne(() => Film, (film) => film.showTimes)
  film: Film

  @ManyToOne(() => Room, (room) => room.showTimes)
  room: Room
}
