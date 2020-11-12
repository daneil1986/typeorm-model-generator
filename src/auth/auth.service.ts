import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Logger } from 'winston';

import * as qs from 'qs';
import * as config from 'config';

import { IPService } from '@node/ips';
import { LOG_PROVIDER } from '@node/nest-logger';
import { API } from '../common/enum/api.constants';
import axios from 'axios';

@Injectable()
export class AuthService {

  domain: any;
  uidDomain: any;

  constructor(
    private readonly httpService: HttpService,
    @Inject(LOG_PROVIDER) private readonly logger: Logger
  ) {
    this.domain = config.get('domain.authServer');
    this.uidDomain = config.get('domain.uidServer');
  }

  async getMenuInfo(data): Promise<any> {
    return await this.httpService
      .get(`${this.domain}${API.AUTH_MENUINFO_API}`,
        {
          params: data,
        })
      .toPromise()
      .then(response => response.data);
  }

  async test(): Promise<any> {
    return await this.httpService
      .get('http://localhost:4000/api/icourse/student/statusupload')
      .toPromise()
      .then(resp => resp.data);
  }

  async getUserInfo(data): Promise<any> {
    return await this.httpService
      .get(`${this.domain}${API.AUTH_USERINFO_API}`,
        { params: data },
      )
      .toPromise()
      .then(response => response.data);
  }

  async getUid(data): Promise<any> {
    const url = `${this.uidDomain}${API.ZYBUSS_GETUID_API}`;

    return await this.httpService
      .post(url, data.data, { params: data.params })
      .toPromise()
      .then(response => response);
  }

  async login(req, res): Promise<any> {
    let ips = new IPService({ port: config.redisServer.port, host: config.redisServer.host });
    let result: any = await ips.getUserInfo(req, res);
    res.json(result);
  }

}


