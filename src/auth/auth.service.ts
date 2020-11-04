import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Logger } from 'winston';

import * as qs from 'qs'
import * as config from 'config';
import { map } from 'rxjs/operators';

import { IPService } from '@node/ips';
import { LOG_PROVIDER } from '@node/nest-logger'
import { API } from '../common/enum/api.constants';

@Injectable()
export class AuthService {

  domain: any;

  constructor(
    private readonly httpService: HttpService,
    @Inject(LOG_PROVIDER) private readonly logger: Logger
  ) {
    this.domain = config.get('domain.authServer')
  }

  async getMenuInfo(data): Promise<any> {
    return await this.httpService
      .get(`${this.domain}${API.AUTH_MENUINFO_API}`,
        {
          params: data
        })
      .toPromise()
      .then(response => response.data)
  }

  async getUserInfo(data): Promise<any> {
    return await this.httpService
      .get(`${this.domain}${API.AUTH_USERINFO_API}`,
        { params: data }
      )
      .toPromise()
      .then(response => response.data)
  }

  async login(req, res): Promise<any> {
    let ips = new IPService({ port: config.redisServer.port, host: config.redisServer.host })
    let result: any = await ips.getUserInfo(req, res)
    res.json(result)
  }

}


