import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChairType } from "./enum/chairType.enum";
import { Room } from "./room.entity";
import { Exclude } from "class-transformer";

@Entity('chair')
export class Chair {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 2})
  row: String

  @Column()
  number: number

  @Column({type: 'varchar'})
  type: ChairType

  @ManyToOne(() => Room, (room) => room.chairs)
  @Exclude()
  room: Room

  @Column()
  positionX: number;

  @Column()
  positionY: number;
}