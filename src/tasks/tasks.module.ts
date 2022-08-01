import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { taskSchema , Task , SubTask , subTaskSchema } from "./tasks.models";



@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        MongooseModule.forFeature([{
            name: Task.name,
            schema: taskSchema
        } , {
            name: SubTask.name,
            schema: subTaskSchema
        }]),
    ],
    providers: [TasksService ],
    controllers: [TasksController]
})
export class TasksModule { 
    
}