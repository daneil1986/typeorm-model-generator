import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BosClient } from '@baiducloud/sdk';

import { ApiException } from '@/common/exceptions/api.exception';
import { ApiErrorCode, errNoAndErrStrMap } from '@/common/exceptions/api.code.enum';
import { TransformResInterceptor } from '@/common/interceptors/transformRes.interceptor';

import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseInterceptors(TransformResInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    console.log(user);
    return user;
  }

  @Delete(':uid')
  async deleteUser(@Param('uid') uid: string) {
    return await this.userService.delUser(uid);
  }

  @Put(':uid')
  async updateUser(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(uid, updateUserDto);
  }

  @Get(':uid')
  async findOne(@Param('uid') uid: string) {
    return await this.userService.findOne({ uid });
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
