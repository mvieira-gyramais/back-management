import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsOptional()
  disciplina: string;

  @IsString()
  @IsNotEmpty()
  cursoId: string;
}

export class UpdateProfessorDto {
  @IsString()
  nome?: string;

  @IsEmail()
  email?: string;

  @IsString()
  cpf?: string;

  @IsString()
  telefone?: string;

  @IsString()
  disciplina?: string;

  @IsString()
  @IsNotEmpty()
  cursoId?: string;
}
