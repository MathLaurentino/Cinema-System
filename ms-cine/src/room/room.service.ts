import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {

  @InjectRepository(Room)
  private readonly roomRepository: Repository<Room>;


  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const existRoom = await this.roomRepository.findOne({where: {number: createRoomDto.number}})
    if (existRoom) {
      throw new ConflictException(`Room number ${createRoomDto.number} is already in use`)
    }
    
    const room = await this.roomRepository.create({... createRoomDto})
    
    return this.roomRepository.save(room)
  }


  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find({relations: ['chairs']})
  }


  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({where: { id }, relations: ['chairs']})
    
    if (!room) 
      throw new NotFoundException(`Room with id ${id} not found`)
    
    return room;
  }


  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomRepository.preload({
      ... updateRoomDto,
      id
    })
    
    if (room == null) 
      throw new NotFoundException(`Room with id ${id} not found`)
    
    const existRoom = await this.roomRepository.findOne({where: {number: updateRoomDto.number}})
    if (updateRoomDto.number && existRoom && existRoom.id != room.id) 
      throw new ConflictException(`Room number ${updateRoomDto.number} is already in use`)
    
    return this.roomRepository.save(room);
  }


  async remove(id: number): Promise<void> {
    const room = await this.roomRepository.findOne({where: { id }})
    
    if (!room) 
      throw new NotFoundException(`Room with id ${id} not found`)

    this.roomRepository.delete(room);
  }
}
