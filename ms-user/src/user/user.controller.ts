import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { CurrentUser } from './jwt/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { Roles } from './jwt/roles.decorator';
import { UserRole } from './entities/enum/userRole.enum';
import { UpdateUserDto } from './dto/update-user.dtp';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() currentUser: CurrentUserDto) {
    console.log(currentUser)

    return this.userService.findAll();
  }

  @Roles(UserRole.REGULAR_USER, UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @CurrentUser() currentUser: CurrentUserDto) {
    return this.userService.findOne(id, currentUser.userId);
  }

  @Roles(UserRole.REGULAR_USER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: CurrentUserDto) {
    return this.userService.update(id, updateUserDto, currentUser.userId);
  }

}
