import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { GenreDto } from './dto/genre.dto';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

describe('GenreService Unit Tests', () => {
  let service: GenreService;
  let id: number;
  let expectedGenre: any;
  let mockGenreRepository: any;

  beforeEach(async () => {
    service = new GenreService();
    id = Math.floor(Math.random() * 10) + 1;
    expectedGenre = { id, name: 'Action', films: [] };
    
    mockGenreRepository = {
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };
    
    //@ts-expect-error
    service['genreRepository'] = mockGenreRepository;
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a genre', async () => {
    const genreDto: GenreDto = { name: 'Action' };
    
    mockGenreRepository.findOne.mockReturnValueOnce(Promise.resolve(null));
    mockGenreRepository.save.mockReturnValueOnce(Promise.resolve(expectedGenre));
    
    const newGenre = await service.create(genreDto);
    
    expect(mockGenreRepository.findOne).toHaveBeenCalledWith({
      where: { name: expect.any(Object) },
    });
    expect(mockGenreRepository.save).toHaveBeenCalled();
    expect(newGenre).toStrictEqual(expectedGenre);
  });

  it('should throw an error when trying to create a duplicate genre', async () => {
    const genreDto: GenreDto = { name: 'Action' };
    
    mockGenreRepository.findOne.mockReturnValueOnce(Promise.resolve(expectedGenre));
    
    await expect(service.create(genreDto)).rejects.toThrow(BadRequestException);
  });


  it('should update a genre', async () => {
    const genreDto: GenreDto = { name: 'Adventure' };
    
    mockGenreRepository.preload.mockReturnValueOnce(Promise.resolve(expectedGenre));
    mockGenreRepository.save.mockReturnValueOnce(Promise.resolve(expectedGenre));
    
    const updatedGenre = await service.update(id, genreDto);
    
    expect(mockGenreRepository.preload).toHaveBeenCalledWith({
      ...genreDto,
      id,
    });
    expect(mockGenreRepository.save).toHaveBeenCalled();
    expect(updatedGenre).toStrictEqual(expectedGenre);
  });

  it('should throw an error if genre not found during update', async () => {
    const genreDto: GenreDto = { name: 'Adventure' };
    
    mockGenreRepository.preload.mockReturnValueOnce(null);
    
    await expect(service.update(id, genreDto)).rejects.toThrow(NotFoundException);
  });


  it('should remove a genre', async () => {
    mockGenreRepository.findOne.mockReturnValueOnce(Promise.resolve(expectedGenre));
    mockGenreRepository.remove.mockReturnValueOnce(Promise.resolve(expectedGenre));
    
    const deletedGenre = await service.remove(id);
    
    expect(mockGenreRepository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['films'],
    });
    expect(mockGenreRepository.remove).toHaveBeenCalledWith(expectedGenre);
    expect(deletedGenre).toStrictEqual(expectedGenre);
  });

  it('should throw an error if genre not found during removal', async () => {
    mockGenreRepository.findOne.mockReturnValueOnce(Promise.resolve(null));
    
    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if genre has associated films during removal', async () => {
    const genreWithFilms = { ...expectedGenre, films: [{}] };
    
    mockGenreRepository.findOne.mockReturnValueOnce(Promise.resolve(genreWithFilms));
    
    await expect(service.remove(id)).rejects.toThrow(ConflictException);
  });


  it('should get all genres', async () => {
    mockGenreRepository.find.mockReturnValueOnce(Promise.resolve([expectedGenre]));
    
    const genres = await service.getAll();
    
    expect(mockGenreRepository.find).toHaveBeenCalled();
    expect(genres).toStrictEqual([expectedGenre]);
  });
});
