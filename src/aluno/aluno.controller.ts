import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { CreateAlunoDto, UpdateAlunoDto } from './aluno.dto';
import { AlunoService } from './aluno.service';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async createAluno(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  async getAlunos() {
    const alunos = await this.alunoService.getAlunos();
    return alunos;
  }

  @Put(':id')
  async updateAluno(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.updateAluno(id, updateAlunoDto);
  }

  @Delete(':id')
  async deleteAluno(@Param('id') id: string) {
    return this.alunoService.deleteAluno(id);
  }
}
