import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';



@Module({
  imports: [
    UsersModule,
    ListsModule,
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost/final_product'),
  ],

})
export class AppModule {}
