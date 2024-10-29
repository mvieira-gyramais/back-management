import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  descricao: string;
}

export class UpdateCursoDto {
  @IsString()
  nome?: string;

  @IsString()
  codigo?: string;

  @IsString()
  descricao?: string;
}
