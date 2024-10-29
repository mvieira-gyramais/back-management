import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  static curso(curso: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  static aluno: any;
  private _aluno: any;
  public get aluno(): any {
    return this._aluno;
  }
  public set aluno(value: any) {
    this._aluno = value;
  }
}