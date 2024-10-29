import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto, UpdateProfessorDto } from './professor.dto';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  async createProfessor(@Body() createProfessorDto: CreateProfessorDto) {
    const professor = await this.professorService.createProfessor(createProfessorDto);
    return professor;
  }

  @Get()
  async getProfessores() {
    return this.professorService.getProfessores();
  }

  @Get(':id')
  async getProfessorById(@Param('id') id: string) {
    return this.professorService.getProfessorById(id);
  }

  @Put(':id')
  async updateProfessor(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
    return this.professorService.updateProfessor(id, updateProfessorDto);
  }

  @Delete(':id')
  async deleteProfessor(@Param('id') id: string) {
    return this.professorService.deleteProfessor(id);
  }
}
