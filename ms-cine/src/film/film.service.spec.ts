import { Test, TestingModule } from '@nestjs/testing';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { NotFoundException } from '@nestjs/common';

describe('FilmService Unit Tests', () => {
  
  let service: FilmService;
  let id: number;
  let expectedFilm: any;
  let expectedGenre: any;
  let mockFilmRepository: any;
  let mockGenreRepository: any;

  beforeEach(async () => {
    service = new FilmService();
    id = Math.floor(Math.random() * 10) + 1;
    expectedGenre = { id, name: 'Action' };
    expectedFilm = {
      id,
      title: 'Como Treinar o Seu Dragão',
      description: 'Soluço é um jovem viking que não tem capacidade para lutar contra os dragões',
      author: "Someone",
      duration: "02:45",
      language: "English",
      genres: [expectedGenre],
    };
    
    mockFilmRepository = {
      create: jest.fn(),
      save: jest.fn(),
      preload: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };
    
    mockGenreRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
    };
    
    //@ts-expect-error
    service['filmRepository'] = mockFilmRepository;
    //@ts-expect-error
    service['genreRepository'] = mockGenreRepository;
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a film', async () => {
    const createFilmDto: CreateFilmDto = {
      name: 'Como Treinar o Seu Dragão',
      description: 'Soluço é um jovem viking que não tem capacidade para lutar contra os dragões',
      author: "Someone",
      duration: "02:45",
      language: "English",
      genres: ['Action'],
    };
    
    mockGenreRepository.findOne.mockReturnValueOnce(Promise.resolve(expectedGenre.name));
    mockFilmRepository.save.mockReturnValueOnce(Promise.resolve(expectedFilm));
    
    const newFilm = await service.create(createFilmDto);
    
    expect(mockGenreRepository.findOne).toHaveBeenCalled();
    expect(mockFilmRepository.save).toHaveBeenCalled();
    expect(newFilm).toStrictEqual(expectedFilm);
  });


  it('should get all films', async () => {
    // Mocks específicos para este teste
    mockFilmRepository.find.mockReturnValueOnce(Promise.resolve([expectedFilm]));
    
    const films = await service.findAll();
    
    expect(mockFilmRepository.find).toHaveBeenCalled();
    expect(films).toStrictEqual([expectedFilm]);
  });


  it('should get a film by id', async () => {
    // Mocks específicos para este teste
    mockFilmRepository.findOne.mockReturnValueOnce(Promise.resolve(expectedFilm));
    
    const film = await service.findOne(id);
    
    expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['genres'],
    });
    expect(film).toStrictEqual(expectedFilm);
  });
  
  it('should throw an error if film not found by id', async () => {
    // Mocks específicos para este teste
    mockFilmRepository.findOne.mockReturnValueOnce(Promise.resolve(null));
    
    await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    expect(mockFilmRepository.findOne).toHaveBeenCalled();
  });


  it('should update a film', async () => {
    const updateFilmDto: UpdateFilmDto = {
      name: 'Como Treinar o Seu Dragão - Updated',
      description: 'An updated description',
      author: "Someone2",
      duration: "02:45",
      language: "Portugues",
      genres: ['Action'],
    };
    mockGenreRepository.findOne.mockReturnValueOnce(Promise.resolve(expectedGenre.name));
    mockFilmRepository.preload.mockReturnValueOnce(Promise.resolve(expectedFilm));
    mockFilmRepository.save.mockReturnValueOnce(Promise.resolve(expectedFilm));
    
    const updatedFilm = await service.update(id, updateFilmDto);
    
    expect(mockFilmRepository.save).toHaveBeenCalled();
    expect(updatedFilm).toStrictEqual(expectedFilm);
  });

  it('should throw an error if film not found during update', async () => {
    mockFilmRepository.preload.mockReturnValueOnce(null);
    
    await expect(service.update(id, { title: 'Updated Title' } as any)).rejects.toThrow(NotFoundException);
  });


  it('should remove a film', async () => {
    mockFilmRepository.findOne.mockReturnValueOnce(Promise.resolve(expectedFilm));
    mockFilmRepository.remove.mockReturnValueOnce(Promise.resolve(expectedFilm));
    
    await service.remove(id);
    
    expect(mockFilmRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(mockFilmRepository.remove).toHaveBeenCalled();
  });

  it('should throw an error if film not found during removal', async () => {
    mockFilmRepository.findOne.mockReturnValueOnce(Promise.resolve(null));
    
    await expect(service.remove(id)).rejects.toThrow(NotFoundException);
  });
});
