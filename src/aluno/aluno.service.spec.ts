import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlunoDto, DeleteAlunoDto, UpdateAlunoDto } from './aluno.dto';

describe('AlunoService', () => {
  let service: AlunoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunoService,
        {
          provide: PrismaService,
          useValue: {
            aluno: {
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um aluno', async () => {
    const createAlunoDto: CreateAlunoDto = { 
      nome: 'Marcelo', 
      email: 'mjunior@gmail.com', 
      cpf: '99999999999', 
      telefone: '11111111111', 
      professorId: 'professor-id' };

    jest
      .spyOn(prismaService.aluno, 'create')
      .mockResolvedValueOnce(createAlunoDto as any);

    const result = service.create(createAlunoDto);

    expect(prismaService.aluno).toHaveBeenCalledWith(createAlunoDto);
    expect(result).toEqual(createAlunoDto);
  });

  /*it('deve retornar todos os alunos', async () => {
    const aluno = { id: 'aluno-id', nome: 'Giovanni', email: 'giovanni@gmail.com' };

    jest
      .spyOn(prismaService.aluno, 'return')
      .mockResolvedValueOnce(UpdateAlunoDto as any);

    const result = await service.getAlunos();

    expect(prismaService.aluno.findMany).toHaveBeenCalled();
    expect(result).toEqual([aluno]);
  });*/
});

