import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlunoDto, UpdateAlunoDto } from './aluno.dto';
import { validObjectID } from 'src/utils/valid-objectid';

@Injectable()
export class AlunoService {

  constructor(private readonly prismaService: PrismaService) {}
 
    async create(createAlunoDto: CreateAlunoDto) {
      const { nome, email, cpf, telefone, cursoId } = createAlunoDto;

      if (!validObjectID(cursoId)) {
        throw new BadRequestException('CursoID em formato inválido')
      }
        
      return await this.prismaService.aluno.create({
        data: { nome, email, cpf, telefone, cursoAluno: { create: { cursoId: cursoId } }},
      });
    }

  async getAlunos() {
    return await this.prismaService.cursoAluno.findMany({ 
      include: {
        aluno: true,
        curso: {include: {professor: true,}
        }
      }
    });
  }

  async getAlunoById(id: string) {
    const aluno = await this.prismaService.aluno.findUnique({ where: { id } });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    return aluno;
  }

  async updateAluno(id: string, updateAlunoDto: UpdateAlunoDto) {
    const { nome, email, cpf, telefone, professorId } = updateAlunoDto;
    const aluno = await this.prismaService.aluno.update({
      where: { id },
      data: { nome, email, cpf, telefone, professor: professorId ? { connect: { id: professorId } } : undefined },
    });
    return aluno;
  }

  async deleteAluno(id: string) {
    const aluno = await this.prismaService.aluno.delete({
      where: { id },
    });
    return aluno;
  }
}

