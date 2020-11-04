import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

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
