import { Schema , SchemaFactory , Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "src/users/users.models";
import * as mongoose from 'mongoose';

export type ListsDocument = List & Document;


@Schema()
export class List { 
    _id: string;
    @Prop({type: mongoose.Schema.Types.ObjectId , ref: User.name})
    user: User;
    @Prop()
    title: string;
    @Prop()
    descrption: string;
}

export const listSchema = SchemaFactory.createForClass(List);