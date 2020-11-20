import { Controller, Get, Post, Body, Req, UsePipes, Query, Headers, HttpStatus, UseFilters, Res } from '@nestjs/common';
import { Request, Response } from 'express'

import { AuthService } from './auth.service';
import { authUserDto } from './dto/authUserDto';

import { ApiException } from 'src/common/exceptions/api.exception';
import { ApiErrorCode } from 'src/common/exceptions/api.code.enum';
import { HttpExceptionFilter } from 'src/common/filters/http.exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/menuinfo')
  menuInfo(@Body() menuParam: authUserDto): any {
    return this.authService.getMenuInfo(menuParam);
  }

  @Get('/userinfo')
  @UseFilters(HttpExceptionFilter)
  userInfo(@Req() request: Request): any {
    const { systemId, uname } = request.query;
    if (+systemId <= 0) {
      throw new ApiException(ApiErrorCode.USER_ID_INVALID, '用户ID无效', HttpStatus.BAD_REQUEST);
    }
    return this.authService.getUserInfo({ systemId, uname })
  }

  @Get('/test')
  test(): any {
    return this.authService.test();
  }

  // @Get('/uid')
  // uidInfo(@Req() request: Request): any {
  //   const { zybuss } = request.query
  //   const ocsSign = CryptoJS.MD5('kid', 'session', '/session/submit/saaslogin').toString()
  //   const tm = (Date.parse(new Date().toString()) / 1000)
  //   const tenantcode = "861861"
  //   return this.authService.getUid({ data: { zybuss, ocsSign, tm, tenantcode } })
  // }

  @Get('/login')
  login(@Req() req: Request, @Res() res: Response): any {
    return this.authService.login(req, res);
  }

}
