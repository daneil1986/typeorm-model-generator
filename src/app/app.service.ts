import { Injectable, HttpService } from '@nestjs/common';

import * as config from 'config';
import { IPService } from '@node/ips';
import { API } from '../common/enum/api.constants';

@Injectable()
export class AppService {
  domain: any;

  constructor(
    private readonly httpService: HttpService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async redirect(req, res): Promise<any> {
    let ips = new IPService({ port: config.redisServer.port, host: config.redisServer.host })
    console.log(req);
    console.log(res);
    await ips.login(req, res).then((result) => {
      console.log('自行设置定向地址')
      res.redirect('http://preschool-preschool-env.suanshubang.com/preschool/auth/userinfo?uname=xiaowei&systemId=15')
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
