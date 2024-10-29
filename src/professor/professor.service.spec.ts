import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto, UpdateProfessorDto } from './professor.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProfessorService', () => {
  let service: ProfessorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessorService, PrismaService],
    }).compile();

    service = module.get<ProfessorService>(ProfessorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProfessor', () => {
    it('deve criar um novo professor', async () => {
      const createProfessorDto: CreateProfessorDto = {
        nome: 'Luiz',
        email: 'luiz@gmail.com',
        cpf: '11111111111',
        telefone: '2222222222',
        cursoId: 'curso123',
        disciplina: 'Matemática',
      };

      jest
        .spyOn(prismaService.professor, 'create')
        .mockResolvedValueOnce({
        id: 'professorId123',
        ...createProfessorDto,
        curso: { id: createProfessorDto.cursoId, nome: 'Matemática' },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createProfessor(createProfessorDto);
      expect(result).toEqual({
        id: 'professorId123',
        ...createProfessorDto,
        curso: { id: createProfessorDto.cursoId, nome: 'Matemática' },
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(prismaService.professor.create).toHaveBeenCalledWith({
        data: {
          ...createProfessorDto,
          curso: { connect: { id: createProfessorDto.cursoId } },
        },
        include: { curso: true },
      });
    });
  });

  describe('getProfessores', () => {
    it('retornar lista de professores', async () => {
      const professors = [
        {
        id: '123',
        nome: 'Carlos',
        email: 'carlos@gmail.com',
        cpf: '44444444444',
        telefone: '555555555',
        curso: { id: 'curso333', nome: 'Matemática' },
      ];

      jest.spyOn(prismaService.professor, 'findMany').mockResolvedValueOnce(professors);

      const result = await service.getProfessores();
      expect(result).toEqual(professors);
      expect(prismaService.professor.findMany).toHaveBeenCalledWith({
        include: { curso: true },
      });
    });
  });

  });

  describe('updateProfessor', () => {
    it('should update a professor', async () => {
      const updateProfessorDto: UpdateProfessorDto = {
        nome: 'Marta',
        disciplina: 'Física',
      };

      const existingProfessor = {
        id: '123',
        nome: 'Carlos',
        email: 'carlos@gmail.com',
        cpf: '44444444444',
        telefone: '555555555',
        curso: { id: 'curso333', nome: 'Matemática' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prismaService.professor, 'findUnique')
        .mockResolvedValueOnce(existingProfessor);
      jest
        .spyOn(prismaService.professor, 'update')
        .mockResolvedValueOnce({
        ...existingProfessor,
        ...updateProfessorDto,
        updatedAt: new Date(),
      });

      const result = await service.updateProfessor('professorId123', updateProfessorDto);
      expect(result).toEqual({
        ...existingProfessor,
        ...updateProfessorDto,
        updatedAt: expect.any(Date),
      });
      expect(prismaService.professor.update).toHaveBeenCalledWith({
        where: { id: 'professorId123' },
        data: {
          ...updateProfessorDto,
        },
        include: { curso: true },
      });
    });
  });

  describe('deleteProfessor', () => {
    it('should delete a professor by ID', async () => {
      const existingProfessor = {
        id: '123',
        nome: 'Carlos',
        email: 'carlos@gmail.com',
        cpf: '44444444444',
        telefone: '555555555',
        curso: { id: 'curso333', nome: 'Matemática' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prismaService.professor, 'delete')
        .mockResolvedValueOnce(existingProfessor);

      const result = await service.deleteProfessor('professorId123');
      expect(result).toEqual(existingProfessor);
      expect(prismaService.professor.delete).toHaveBeenCalledWith({
        where: { id: '123' },
        include: { curso: true },
      });
    });

    it('enviar NotFoundException se não encontrar professor', async () => {
      jest.spyOn(prismaService.professor, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.deleteProfessor('professorId123')).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaService.professor.findUnique).toHaveBeenCalledWith({
        where: { id: 'professorId123' },
      });
    });
  });
});
