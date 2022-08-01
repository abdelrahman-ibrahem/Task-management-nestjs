import  { PassportStrategy } from '@nestjs/passport';
import {  Strategy , ExtractJwt } from 'passport-jwt';
import { Injectable , UnauthorizedException } from '@nestjs/common';
import { User , UserDocument } from './users.models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { jwtPayload } from './jwt-payload';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'jwtprivatekey'
        })
    }


    async validate(payload : jwtPayload){
        const { email  } = payload;
        const user = await this.userModel.findOne({email})
        if (!user){
            throw new UnauthorizedException()
        }
        return user;
    }
}