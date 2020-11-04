import { Injectable, HttpService } from '@nestjs/common';

import * as config from 'config';
import { IPService } from '@node/ips';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async redirect(req, res): Promise<any> {
    let ips = new IPService({ port: config.redisServer.port, host: config.redisServer.host })
    await ips.login(req, res).then((result) => {
      console.log('自行设置定向地址')
      res.redirect('http://127.0.0.1:3000/z_project_server/auth/userinfo?uname=xiaowei&systemId=15')
    })
  }

  async logout(res): Promise<any> {
    let ips = new IPService({ port: config.redisServer.port, host: config.redisServer.host })
    const logoutUrl = await ips.logout()
    res.json({
      errNo: 0,
      data: {
        logoutUrl
      }
    })
  }
}
