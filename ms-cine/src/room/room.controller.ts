import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateLayoutDto } from './dto/create-layout.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  @Post(':roomId/layout')
  createRoomLayout(@Param('roomId') roomId: number, @Body() createLayoutDto: CreateLayoutDto) {
    return this.roomService.createRoomLayout(roomId, createLayoutDto)
  }

  @Put(':roomId/layout')
  updateRoomLayout(@Param('roomId') roomId: number, @Body() updateLayoutDto: CreateLayoutDto) {
    return this.roomService.updateRoomLayout(roomId, updateLayoutDto)
  }
}
