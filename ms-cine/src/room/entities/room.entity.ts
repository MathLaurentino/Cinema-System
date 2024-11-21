import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chair } from "./chair.entity";
import { RoomType } from "./enum/roomType.enum";

@Entity('room')
export class Room {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  type: RoomType;

  @Column({unique: true, nullable: false})
  number: number

  @OneToMany(() => Chair, (chair) => chair.room, {onDelete: 'CASCADE'})
  chairs: Chair[]
}
