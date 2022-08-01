import { Controller , Get , Post , Body , Delete, Patch, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task-dto";
import { List } from "src/lists/lists.models";
import { Task } from "./tasks.models";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController { 
    constructor(
        private taskService: TasksService
    ){

    }
    // get tasks
    @Get()
    async gettasks(){
        const tasks = await this.taskService.gettasks();
        return tasks;
    }
    // create task
    @Post()
    async createtask(
        @Body() CreateTaskDto: CreateTaskDto,
    ){
        const task = await this.taskService.createtask(CreateTaskDto);
        return task;
    }
    // get task 
    @Get('/:id')
    async gettask(
        @Param('id') id: string,
    ){
        const task = await this.taskService.gettask(id);
        return task;
    }
    // update task 
    @Patch('/:id')
    async updatetask(
        @Param('id') id: string,
        @Body('is_compeleted') is_compeleted: boolean
    ){
        const task = await this.taskService.updatetask(id , is_compeleted);
        return task;
    }
    // remove task
    @Delete('/:id')
    async removetask(
        @Param('id') id: string
    ){
        return await this.taskService.deletetask(id); 
    }
    @Get('/lists/:list')
    async getTasksByLists(
        @Param('list') list: List
    ){
        const tasks = await this.taskService.getTasksByLists(list);
        return tasks;
    }
    @Post('/create/subtask')
    async createSubTasks(
        @Body('subtask') subtask: Task ,
        @Body('task') task: Task ,
        
    ){
        const newTask = await this.taskService.createSubTask(task , subtask);
        return newTask;
    }
    @Get('/subtasks/:id')
    async getSubtasks(
            @Param('id') taskId: string,
        ){
        const tasks = await this.taskService.getSubTasks(taskId);
        return tasks;
    }
}