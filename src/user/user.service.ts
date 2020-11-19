import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * 根据条件查询用户
   * @Params object { id: 1 } 或者 { uid: 'sss' } 等
   * 只支持单个条件查询
   */
  async findOne(data: any): Promise<User> {
    return await this.userRepository.findOne(data);
  }

  async delUser(uid: string): Promise<any> {
    const user = await this.findOne({ uid });
    return this.userRepository.delete(user.id);
  }

  async update(uid: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.findOne({ uid });
    return this.userRepository.update(user.id, updateUserDto);
  }

  getUserInfo(data) {
    return undefined;
  }

  updateUserInfo(data) {}
}
