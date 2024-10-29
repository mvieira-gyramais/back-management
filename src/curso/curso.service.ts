import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto, UpdateCursoDto } from './curso.dto';

@Injectable()
export class CursoService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCurso(createCursoDto: CreateCursoDto) {
    const { nome, codigo, descricao } = createCursoDto;

    return await this.prismaService.curso.create({
      data: {
        nome,
        codigo,
        descricao,
      },
    });
  }

  async getCursos() {
    return await this.prismaService.curso.findMany();
  }

  async getCursoById(id: string) {
    const curso = await this.prismaService.curso.findUnique({ where: { id } });
    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }
    return curso;
  }

  async updateCurso(id: string, updateCursoDto: UpdateCursoDto) {
    const { nome, codigo, descricao } = updateCursoDto;

    const curso = await this.prismaService.curso.update({
      where: { id },
      data: {
        nome,
        codigo,
        descricao,
      },
    });
    return curso;
  }

  async deleteCurso(id: string) {
    const curso = await this.prismaService.curso.delete({
      where: { id },
    });
    return curso;
  }
}
