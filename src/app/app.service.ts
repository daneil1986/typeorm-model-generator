import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }
}
