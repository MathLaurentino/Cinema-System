import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Chair } from './entities/chair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Chair])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
