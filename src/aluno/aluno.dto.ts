import { IsString, IsEmail, IsNotEmpty, IsOptional, Min, MinLength, MaxLength, Matches,  } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Matches(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos' })
  cpf: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Matches(/^\d{10,11}$/, { message: 'Telefone deve conter 10 ou 11 dígitos (DDD + Número)' })
  telefone?: string;

  @IsString()
  @IsNotEmpty()
  cursoId: string;
}

export class UpdateAlunoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  professorId?: string;
}

export class AlunoResponseDto {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone?: string;
  professorId: string;
}

export class DeleteAlunoDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
