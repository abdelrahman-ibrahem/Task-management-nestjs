import { Injectable  , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { List, ListsDocument } from "./lists.models";
import { Model } from "mongoose";
import { CreateListDto } from "./dto/create-list-dto";
import { User , UserDocument } from "src/users/users.models";


@Injectable()
export class ListsService { 
    constructor(
        @InjectModel(List.name)
        private listModel: Model<ListsDocument>,

    ){}

    // display all lists
    async getLists(user: User){
        const lists = await this.listModel.find({user: user._id});
        return lists;
    }
    // get list by id
    async getList(_id: string){
        const list = await this.listModel.findById(_id).populate('user');
        if (!list){
            throw new NotFoundException()
        }
        return list;
    }
    // create list 
    async createlist(CreateListDto: CreateListDto , user: User) {
        const { title , descrption } = CreateListDto;
        const list = await this.listModel.create({
            title,
            descrption,
            user: user._id
        });
        return list;
    }
    // update  list
    async updatelist( _id: string ,title: string , descrption: string) {
        const list = await this.getList(_id);
       if (title){
        list.title = title;
       }
       if (descrption){
        list.descrption = descrption;
       }
       await list.save();
       return list;
    }
    // delete list 
    async deletelist(_id){
        const list = await this.getList(_id);
        await this.listModel.findByIdAndRemove(_id);
        return 'deleted';
    }
}