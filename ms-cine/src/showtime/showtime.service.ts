import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Showtime } from './entities/showtime.entity';
import { Repository } from 'typeorm';
import { RoomService } from 'src/room/room.service';
import { FilmService } from 'src/film/film.service';

@Injectable()
export class ShowtimeService {

  @InjectRepository(Showtime)
  private readonly showtimeRepository: Repository<Showtime>;

  @Inject()
  private readonly filmService: FilmService

  @Inject()
  private readonly roomService: RoomService

  async create(dto: CreateShowtimeDto): Promise<Showtime> {
    const [film, room] = await Promise.all([
      this.filmService.findOne(dto.filmId),
      this.roomService.findOne(dto.roomId),
    ]);
    
    const newStartTime = new Date(dto.startTime);
    const newEndTime = this.calculateEndDate(film.duration, newStartTime);
    
    const conflictingShowtime = await this.showtimeRepository
      .createQueryBuilder("showtime")
      .where("showtime.room = :roomId", { roomId: room.id })
      .andWhere("showtime.startTime < :newEndTime AND showtime.endTime > :newStartTime", {
        newStartTime,
        newEndTime,
      })
      .getOne();
      
    if (conflictingShowtime) {
      throw new ConflictException(
        `The room is already booked for a showtime during the requested time slot. ` +
        `Conflicting showtime ID: ${conflictingShowtime.id}, ` +
        `Start Time: ${conflictingShowtime.startTime.toLocaleString()}, ` +
        `End Time: ${conflictingShowtime.endTime.toLocaleString()}`
      );
    }
    
    const showtime = this.showtimeRepository.create({
      ...dto,
      endTime: newEndTime,
      room,
      film,
      subtitlesLenguage: (dto.subtitles) ? dto.subtitlesLenguage : null
    });
    
    return this.showtimeRepository.save(showtime);
  }

  findAll() {
    return `This action returns all showtime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} showtime`;
  }

  update(id: number, updateShowtimeDto: UpdateShowtimeDto) {
    return `This action updates a #${id} showtime`;
  }

  remove(id: number) {
    return `This action removes a #${id} showtime`;
  }


  private calculateEndDate(filmDuration: string, startTime: Date): Date {
    const [hours, minutes] = filmDuration.split(":").map(Number);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + hours);
    endTime.setMinutes(endTime.getMinutes() + minutes);

    return endTime;
  }
}
