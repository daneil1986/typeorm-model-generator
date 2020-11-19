import { IsString, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly uid: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly gender: number;

  @IsString()
  readonly birthday: string;

  @IsString()
  readonly openid: string;

  @IsString()
  readonly unionid: string;

  @IsString()
  readonly wechat: string;

  @IsNumber()
  readonly isFollow: number;
}
