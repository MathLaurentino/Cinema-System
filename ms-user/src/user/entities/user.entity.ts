import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./enum/userRole.enum";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 255 })
  cpf: string

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({type: 'varchar', nullable: false})
  role: UserRole

}
