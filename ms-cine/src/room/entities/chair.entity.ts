import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChairType } from "./enum/chairType.enum";
import { Room } from "./room.entity";

@Entity('chair')
export class Chair {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 2})
  row: String

  @Column()
  number: number

  @Column({enum: ChairType, name: 'type'})
  type: ChairType

  @ManyToOne(() => Room, (room) => room.chairs)
  room: Room
}