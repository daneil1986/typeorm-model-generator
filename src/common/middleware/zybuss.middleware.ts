import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  Response,
  HttpService,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { ApiErrorCode } from 'src/common/exceptions/api.code.enum';
import * as CryptoJS from 'crypto-js';
import * as phpUniqid from 'locutus/php/misc/uniqid';
import * as config from 'config';

@Injectable()
export class ZybussMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
  ) {}

  async use(req, @Response() res, next: () => void): Promise<any> {
    const excludePath = ['/sellCourseInfo', '/shareInfo'];
    // 用于测试 的zybuss R2EbjbVbTujZVr1Ed_nra2QQBsuIeb2gdRAIXfxkuTgmvuJWg_WLASMVCpZS_pNd
    // 新的用于测试的zybuss R2wbjrddSuzQV7hEd_nra2QQBMu0Eb6gdRAIXa34kTk8retGi_WcI3YzDZxP16c3
    // await this.authService.test();
    const { zybuss } = req.headers;
    if (zybuss) {
      const tm = Date.parse(new Date().toString()) / 1000;
      const requestId = `rpc${phpUniqid()}_${tm}`;
      const ocsSign = CryptoJS.MD5(
        config.product.ocsAk +
        '/ucloud/service/saasCheckZybuss' +
        tm +
        config.product.token,
      ).toString();
      const tenantcode = config.product.tenantcode;

      const resp = await this.authService.getUid({
        data: { zybuss, tenantcode },
        params: { requestId, ocsSign, tm, ocsAk: config.product.ocsAk },
      })
      .then(respose => respose.data)
      .catch(err => res.json({ errNo: -1, err: err || '获取uid失败' }));

      if (resp.errno === ApiErrorCode.LOGIN_EXPIRED) {
        return res.json({
          errNo: ApiErrorCode.LOGIN_EXPIRED,
          errStr: '登录过期，请重新登录',
        });
      }

      if (resp.errno !== 0) {
        return res.json({
          errNo: ApiErrorCode.CHANGE_UID_FAIL,
          errStr: resp.errmsg,
        });
      }
      if (resp.errno === 0) {
        if (resp.data && resp.data.uid) {
          req.uid = resp.data.uid;
          console.log('resp ===' + JSON.stringify(resp));
        } else {
          return res.json({
            errNo: ApiErrorCode.LOGIN_EXPIRED,
            errStr: '登录过期，请重新登录',
          });
        }
      }
    } else {
      if (excludePath.filter(item => req.path.indexOf(item) > -1).length) {
        next();
        return;
      }
      return res.json({ errNo: ApiErrorCode.LOGIN_EXPIRED, errStr: '未登录' });
    }

    next();
  }
}
