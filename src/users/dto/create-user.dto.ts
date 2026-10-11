import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'nuevo@demo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Nuevo Usuario', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  tenantId: number;
}
