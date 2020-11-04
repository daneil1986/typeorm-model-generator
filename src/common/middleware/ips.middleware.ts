import { Injectable, NestMiddleware, HttpService } from '@nestjs/common';
import { Request, Response } from 'express';

import { IPService } from '@node/ips';

let sid = ''
let secret = ''
let service = ''
let port = ''
let host = ''

/**
 * [IPS登录, 使用前需申请参数, 当前内置的参数只为测试使用]
 * [服务注册参考： http://ued.zuoyebang.cc/documents/saas-doc/#/ips/ips]
 * @param sid 业务系统身份标识
 * @param secret 密码，接入时自动分配，在validate时传给IPS
 * @param service 回跳地址白名单，目前只限制到域名，不限制路径
 * @return  {[type]}  []
 */
@Injectable()
export class IPS implements NestMiddleware {

  constructor(public readonly httpService: HttpService) { }

  async use(req: Request, res: Response, next: Function): Promise<any> {

    let ips = new IPService({ sid, secret, service, port, host })
    let result: any = await ips.getUserInfo(req, res)

    if (result.errNo !== 0) {
      return res.json(result)
    } else {
      next()
    }
  }
}

export function IpsMiddleware({ _sid, _secret, _service, _port, _host }) {
  sid = _sid
  secret = _secret
  service = _service
  port = _port
  host = _host
  return IPS
}
