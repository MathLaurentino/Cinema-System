import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chair } from "./chair.entity";
import { RoomType } from "./enum/roomType.enum";
import { Showtime } from "src/showtime/entities/showtime.entity";

@Entity('room')
export class Room {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  type: RoomType;

  @Column({unique: true, nullable: false})
  number: number

  @OneToMany(() => Chair, (chair) => chair.room, {onDelete: 'CASCADE', cascade: true})
  chairs: Chair[]

  @OneToMany(() => Showtime, (showtime) => showtime.film)
  showTimes: Showtime[]
}
