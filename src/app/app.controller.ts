import { Controller, Get, Req, Res, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from 'src/common/filters/http.exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/redirect')
  login(@Req() req: Request, @Res() res: Response): any {
    return this.appService.redirect(req, res)
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    return this.appService.logout(res)
  }
}
