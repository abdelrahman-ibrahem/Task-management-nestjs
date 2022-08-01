import { createParamDecorator , ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator((data , context: ExecutionContext)=>{
    return context.switchToHttp().getRequest().user;
})