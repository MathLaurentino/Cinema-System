import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { CurrentUser } from './jwt/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { Roles } from './jwt/roles.decorator';
import { UserRole } from './entities/enum/userRole.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN_USER)
  findAll(@CurrentUser() currentUser: CurrentUserDto) {
    console.log(currentUser)

    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.REGULAR_USER, UserRole.ADMIN_USER)
  findOne(@Param('id') id: number, @CurrentUser() currentUser: CurrentUserDto) {
    return this.userService.findOne(id, currentUser.userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
