import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoModule } from './aluno/aluno.module';
import { ProfessorModule } from './professor/professor.module';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [AlunoModule, ProfessorModule, CursoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
