import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chair } from "./chair.entity";
import { RoomType } from "./enum/roomType.enum";

@Entity('room')
export class Room {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({enum: RoomType, name: 'type'})
  type: RoomType

  @Column()
  number: number

  @OneToMany(() => Chair, (chair) => chair.room)
  chairs: Chair[]
}
