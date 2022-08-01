import { Injectable , BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user-dto";
import { User  , UserDocument } from "./users.models";
import * as bcrypt from 'bcrypt';
import { jwtPayload } from "./jwt-payload";



@Injectable()
export class UsersService { 
    constructor(
        @InjectModel(User.name)
        private userModel : Model<UserDocument>,
        private jwtService : JwtService,

    ){}

    async  createUser(createUserDto: CreateUserDto){
        const { username, email , password } = createUserDto;
        const found = await this.userModel.findOne({email});
        if (found){
            throw new BadRequestException('This user is already exsits, please try again');
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await this.userModel.create({
            username , 
            email ,
            password: hashedPassword
        });
        // console.log(user)
        delete user.password
        return user;
    }
    async loginFunction(email: string , password: string){
        const user = await this.userModel.findOne({email});
        if (!user){
            throw new BadRequestException('This user is not found');
        }
        const check = await bcrypt.compare(password , user.password);
        if (!check){
            throw new BadRequestException('Password is wrong');
        }
        const payload : jwtPayload = {
            _id: user._id,
            email
        }
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken};
    }


    async updateProfile(_id: string , username: string){
        const user = await this.userModel.findOne({_id});
        if (username){
            user.username = username;
        }
        await user.save();
        return user;
    }
}