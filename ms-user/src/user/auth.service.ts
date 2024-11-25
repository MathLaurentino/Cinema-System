import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>

  @Inject()
  private readonly jwtService: JwtService

  async signUp(signUpDto: SignUpDto): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: {email: signUpDto.email }})
    if (user) {
      throw new BadRequestException("Email already in use")
    }
    
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(signUpDto.password, salt, 32)) as Buffer;
    const saltAndHash = `${salt}.${hash.toString('hex')}`;
    
    const createUser = this.userRepository.create({
      ... signUpDto,
      password: saltAndHash,
    })
    
    const savedUser = await this.userRepository.save(createUser);
    const { password, ...result } = savedUser;
    return result;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({ where: {email: signInDto.email }})
    if (!user) {
      return new UnauthorizedException('Invalid credentials');
    }
    
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(signInDto.password, salt, 32)) as Buffer;
    
    if (storedHash != hash.toString('hex')) {
      return new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { username: user.email, sub: user.id, roles: [user.role] }
    console.log(payload)
    return { accessToken: this.jwtService.sign(payload) }
  }
}
