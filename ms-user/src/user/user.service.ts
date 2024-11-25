import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { scrypt as _scrypt } from 'crypto';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'name', 'cpf', 'email', 'role'],
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
