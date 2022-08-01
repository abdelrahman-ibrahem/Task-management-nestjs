import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ListsController } from "./lists.controller";
import { listSchema , List } from "./lists.models";
import { ListsService  } from "./lists.service";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: List.name,
            schema : listSchema
        }]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    providers: [ListsService],
    controllers: [ListsController]
})
export class ListsModule { 

}