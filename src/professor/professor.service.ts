import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessorDto, UpdateProfessorDto } from './professor.dto';

@Injectable()
export class ProfessorService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfessor(createProfessorDto: CreateProfessorDto) {
    const { nome, email, cpf, telefone, cursoId } = createProfessorDto;

    return await this.prismaService.professor.create({
      data: {
        nome,
        email,
        cpf,
        telefone,
        cursoId
      },
    });
  }

  async getProfessores() {
    return await this.prismaService.professor.findMany();
  }

  async getProfessorById(id: string) {
    const professor = await this.prismaService.professor.findUnique({ where: { id } });
    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }
    return professor;
  }

  async updateProfessor(id: string, updateProfessorDto: UpdateProfessorDto) {
    const { nome, email, cpf, telefone, cursoId } = updateProfessorDto;
    const professor = await this.prismaService.professor.update({
      where: { id },
      data: {
        nome,
        email,
        cpf,
        telefone,
        cursoId
      },
    });
    return professor;
  }

  async deleteProfessor(id: string) {
    const professor = await this.prismaService.professor.delete({
      where: { id },
    });
    return professor;
  }
}
