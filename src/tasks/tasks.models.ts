import { Schema , SchemaFactory  , Prop} from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { List } from "src/lists/lists.models";


export type TasksDocument = Task & Document;
export type SubTaskDocument = SubTask & Document;

// create schema using mongoose
@Schema()
export class Task {
    _id: string;
    @Prop()
    title: string;
    @Prop({type: Boolean, default: false})
    is_compeleted: boolean;
    @Prop({ type: mongoose.Schema.Types.ObjectId , ref: List.name})
    list: List;
    @Prop({type: Date , default:Date.now().toString() })
    created: string;
    @Prop()
    note: string;
    @Prop()
    location : string;

}

@Schema()
export class SubTask {
    _id: string;
    @Prop({type: mongoose.Schema.Types.ObjectId , ref: Task.name})
    task: Task;
    @Prop({type: mongoose.Schema.Types.ObjectId , ref: Task.name})
    subTask: Task;
}





export const taskSchema = SchemaFactory.createForClass(Task); 


export const subTaskSchema = SchemaFactory.createForClass(SubTask);