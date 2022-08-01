import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersController } from "./users.controllers";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User , userSchema } from "./users.models";
import { JwtStrategy } from "./jwt-strategy";
@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
          }),
          JwtModule.register({
            secret: 'jwtprivatekey',
            signOptions: {
              expiresIn: 3600
            }
          }),
        MongooseModule.forFeature([{
          name: User.name , 
          schema: userSchema
        }])
    ],
    providers: [UsersService , JwtStrategy],
    controllers: [UsersController],
    exports: [
      JwtStrategy,
      PassportModule
    ]
})
export class UsersModule { 

}