import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/userRole.enum';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Post(':roomId/layout')
  createRoomLayout(@Param('roomId') roomId: number, @Body() createLayoutDto: CreateLayoutDto) {
    return this.roomService.createRoomLayout(roomId, createLayoutDto)
  }

  @Roles(UserRole.ADMIN_USER)
  @UseGuards(JwtAuthGuard)
  @Put(':roomId/layout')
  updateRoomLayout(@Param('roomId') roomId: number, @Body() updateLayoutDto: CreateLayoutDto) {
    return this.roomService.updateRoomLayout(roomId, updateLayoutDto)
  }
}
