import { validate, validateOrReject, Contains, IsInt, IsString, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

export class authUserDto {

  @IsString()
  readonly systemId: number

  @IsString()
  readonly uname: string
}