import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport'
import { Console } from 'console';
import { Strategy , ExtractJwt} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service'; 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//this class to validate the access token
constructor(config: ConfigService, private prisma:PrismaService){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('JWT_SECRET')
    })
}
  async validate(payload: {sub:number, email:string}){
    console.log({
        payload
    });
    const user = await this.prisma.user.findUnique({
        where: {
            id: payload.sub
        }
    });
    delete user.hash;
    return user; 
   }
}
//We can protect some of our routes with this strategy
//Only people with a valid token can access it