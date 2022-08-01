import { Controller , Post , Body, Get , Req , Patch , Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user-dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from './get-user-decorator';
import { User } from "./users.models"; 

@Controller('auth')
export class UsersController { 
    constructor(
        private userService: UsersService,
    ){}


    @Post('/register')
    async register(
        @Body() createUserDto: CreateUserDto,
    ){
        const user = await this.userService.createUser(createUserDto);
        return user;
    }
    @Post('/login')
    async login(
        @Body('email') email: string ,
        @Body('password') password: string ,
    ){
        const accessToken = await this.userService.loginFunction(email , password);
        return accessToken;
    }


    @Get('/profile')
    @UseGuards(AuthGuard())
    profile(@GetUser() user: User){
        return {
            user
        }
    }


    @Patch('/profile/update')
    @UseGuards(AuthGuard())
    async updateProfile(
        @Req() req,
        @Body('username') username: string
    ){
        const updatedUser = await this.userService.updateProfile(req.user._id , username);
        return updatedUser;
    }

}