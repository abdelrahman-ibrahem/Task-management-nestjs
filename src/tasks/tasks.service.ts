import { Injectable , NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task  , TasksDocument , SubTaskDocument , SubTask } from "./tasks.models";
import { CreateTaskDto } from "./dto/create-task-dto";
import { List , ListsDocument } from "src/lists/lists.models";

@Injectable()
export class TasksService { 
    constructor(
        @InjectModel(Task.name)
        private taskModel: Model<TasksDocument>,
        @InjectModel(SubTask.name)
        private subTaskModel: Model<SubTaskDocument>
    ){}

    // create task
    async createtask(CreateTaskDto: CreateTaskDto){
        const {title, note, location , list } = CreateTaskDto;
        const task = await this.taskModel.create({
                title,
                note,
                location,
                list,
            });
        return task;
    }
    // display all tasks
    async gettasks(){
        const tasks = await this.taskModel.find();
        return tasks;
    }
    // get task 
    async gettask(id: string){
        const task = await this.taskModel.findById({
                _id: id
            }).populate('list');
        if (!task){
            throw new NotFoundException()
        }
        return task;
    }
    // remove task
    async deletetask(id: string){
        const task = await this.gettask(id);
        await this.taskModel.findByIdAndRemove({_id: id});
        return "deleted";
    }
    // update task

    async updatetask(id: string ,is_compeleted: boolean){
        const task = await this.gettask(id);
        if (is_compeleted){
            task.is_compeleted = is_compeleted;
        }
        await task.save();
        return task;
    }
    // get tasks by list
    async getTasksByLists(listId: List){
        const tasks = await this.taskModel.find({
                list: listId
            });
        return tasks
    }
    // create subtasks
    async createSubTask(task: Task , subTask: Task){
        const newTask = await this.subTaskModel.create({
            task,
            subTask
        });
        return newTask;
    }
    // get all subtasks 
    async getSubTasks(taskId: string){
        const tasks = await this.subTaskModel.find({
                task: taskId
            });
        return tasks;

    }
}