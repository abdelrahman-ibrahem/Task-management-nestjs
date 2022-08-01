import { Schema , SchemaFactory , Prop   } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document  } from "mongoose";
import * as bcrypt from 'bcrypt'


export type UserDocument = User & Document;

@Schema()
export class User {
    _id: string;
    @Prop({unique: true})
    username: string;
    @Prop({unique: true})
    email : string;
    @Prop()
    password: string;
}


export const userSchema = SchemaFactory.createForClass(User);
/*
userSchema.pre('save' , async function(next){
    this.password = await bcrypt.hash(this.password , 10);
    next();
})
*/