import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { scrypt as _scrypt } from 'crypto';
import { UserRole } from './entities/enum/userRole.enum';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'name', 'cpf', 'email', 'role'],
    })
  }

  async findOne(id: number, currentUserId: number) {
    if (id != currentUserId) {
      const currentUser = await this.userRepository.findOne({where: {id: currentUserId}})
      if (currentUser.role != UserRole.ADMIN_USER) {
        throw new UnauthorizedException('User does not have permission')
      }
    }
    
    return this.userRepository.findOne({
      where: {id},
      select: ['id', 'name', 'cpf', 'email', 'role'],
    })
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
