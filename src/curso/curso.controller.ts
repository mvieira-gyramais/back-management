import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto, UpdateCursoDto } from './curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  async createCurso(@Body() createCursoDto: CreateCursoDto) {
    const curso = await this.cursoService.createCurso(createCursoDto);
    return curso;
  }

  @Get()
  async getCursos() {
    return this.cursoService.getCursos();
  }

  @Get(':id')
  async getCursoById(@Param('id') id: string) {
    return this.cursoService.getCursoById(id);
  }

  @Put(':id')
  async updateCurso(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.updateCurso(id, updateCursoDto);
  }

  @Delete(':id')
  async deleteCurso(@Param('id') id: string) {
    return this.cursoService.deleteCurso(id);
  }
}
