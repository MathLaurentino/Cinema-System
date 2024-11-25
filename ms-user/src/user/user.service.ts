import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { scrypt as _scrypt } from 'crypto';
import { UserRole } from './entities/enum/userRole.enum';
import { UpdateUserDto } from './dto/update-user.dtp';

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
        throw new ForbiddenException('User does not have permission')
      }
    }
    
    return this.userRepository.findOne({
      where: {id},
      select: ['id', 'name', 'cpf', 'email', 'role'],
    })
  }


  async update(id: number, updateUserDto: UpdateUserDto, currentUserId: number) {
    if (id != currentUserId) {
      throw new ForbiddenException('User does not have permission')
    }
    
    const userPreload = await this.userRepository.preload({
      ... updateUserDto,
      id
    })
    const user = await this.userRepository.save(userPreload);
    
    const {password, ...result} = user
    return result
  }

}
