import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import jwtDecode from 'jwt-decode'

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 針對firebase提供的不同的kid，使用對應的公鑰去驗證JWT
      secretOrKeyProvider(request, rawJwtToken: string, done) {
        try {
          const { kid } = jwtDecode<{ alg: string; kid: string; typ: string }>(rawJwtToken, {
            header: true
          })
          done(null, process.env[`JWT_KEY_${kid}`])
        } catch (err) {
          done(err, null)
        }
      }
    })
  }

  async validate(payload: any) {
    return {
      name: payload.name,
      uid: payload.user_id
    }
  }
}
