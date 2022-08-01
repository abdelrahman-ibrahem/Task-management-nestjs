import { Controller , Get , Body, UseGuards , Delete , Post , Patch , Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListsService } from "./lists.service";
import { GetUser } from "src/users/get-user-decorator";
import { User } from "src/users/users.models";
import { CreateListDto } from "./dto/create-list-dto";


@Controller('lists')
@UseGuards(AuthGuard())
export class ListsController { 
    constructor(private listService : ListsService){}
    @Get()
    async getlists(@GetUser() user: User){
        const lists = await this.listService.getLists(user);
        return lists;
    }
    @Get('/:id')
    async getlist(
        @Param('id') id: string
    ){ 
        const list = await this.listService.getList(id);
        return list;
    }

    @Post('')
    async createlist(
        @Body() CreateListDto: CreateListDto,
        @GetUser() user: User,
    ){
        const list = await this.listService.createlist(CreateListDto , user);
        return list;
    }
    @Patch('/:id')
    async updateList(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('descrption') descrption: string,
    ){ 
        const list = await this.listService.updatelist(id , title , descrption);
        return list;
    }

    @Delete('/:id')
    async deleteList(
        @Param('id') id: string,
    ){
        await this.listService.deletelist(id);
    }

}