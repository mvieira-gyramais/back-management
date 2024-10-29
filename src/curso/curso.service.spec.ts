import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CursoService', () => {
  let service: CursoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursoService, PrismaService],
    }).compile();

    service = module.get<CursoService>(CursoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
});


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCurso', () => {
    it('should create a curso', async () => {
      const cursoDto = {
        nome: 'Matemática',
        codigo: 'MAT101',
        descricao: 'Curso de Matemática Básica',
      };

      jest
        .spyOn(PrismaService.curso, 'create')
        .mockResolvedValueOnce(cursoDto as any);

      const result = await service.createCurso(cursoDto);
      expect(result).toEqual(cursoDto);
    });
  });

  describe('getCursos', () => {
    it('should return all cursos', async () => {
      const cursos = [
        { nome: 'Matemática', codigo: 'MAT', descricao: 'Matemática' },
        { nome: 'Física', codigo: 'FIS', descricao: 'Física' },
      ];

      jest
        .spyOn(prismaService.curso, 'findMany')
        .mockResolvedValueOnce(cursos as any);

      const result = await service.getCursos();
      expect(result).toEqual(cursos);
    });
  });

  describe('getCursoById', () => {
    it('should return a curso by ID', async () => {
      const curso = { nome: 'Matemática', codigo: 'MAT', descricao: 'Matemática' };

      jest
        .spyOn(prismaService.curso, 'findUnique')
        .mockResolvedValueOnce(curso as any);

      const result = await service.getCursoById('some-id');
      expect(result).toEqual(curso);
    });

    it('should throw NotFoundException if curso not found', async () => {

      jest
        .spyOn(prismaService.curso, 'findUnique')
        .mockResolvedValueOnce(null);

      await expect(service.getCursoById('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCurso', () => {
    it('should update a curso', async () => {
      const updateCursoDto = { nome: 'Matemática Avançada', descricao: 'Matemática Avançada' };
      const updatedCurso = { ...updateCursoDto, codigo: 'MAT10' };

      jest
        .spyOn(prismaService.curso, 'update')
        .mockResolvedValueOnce(updatedCurso as any);

      const result = await service.updateCurso('some-id', updateCursoDto);
      expect(result).toEqual(updatedCurso);
    });

    it('should throw NotFoundException if curso to update not found', async () => {

      jest
        .spyOn(prismaService.curso, 'update')
        .mockRejectedValueOnce(new Error('Curso not found'));

      await expect(service.updateCurso('invalid-id', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteCurso', () => {
    it('should delete a curso', async () => {
      const deletedCurso = { nome: 'Matemática', codigo: 'MAT101', descricao: 'Curso de Matemática Básica' };

      jest
        .spyOn(prismaService.curso, 'delete')
        .mockResolvedValueOnce(deletedCurso as any);

      const result = await service.deleteCurso('some-id');
      expect(result).toEqual(deletedCurso);
    });

    it('should throw NotFoundException if curso to delete not found', async () => {

      jest
        .spyOn(prismaService.curso, 'delete')
        .mockRejectedValueOnce(new Error('Curso not found'));

      await expect(service.deleteCurso('invalid-id')).rejects.toThrow(NotFoundException);
    });
