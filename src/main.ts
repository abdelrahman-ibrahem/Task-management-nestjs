import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { NestFactory  , Reflector} from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AppModule } from './app.module';
import { SwaggerModule , DocumentBuilder} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  UsePipes(new ValidationPipe());
  const reflector = app.get(Reflector);
  UseGuards(AuthGuard());
  const config = new DocumentBuilder()
    .setTitle('Technical task')
    .setDescription('Developed by Abdelrahman ibrahem')
    .setVersion('1.0')
    .addTag('swagger')
    .build();
  const document = SwaggerModule.createDocument(app , config);
  SwaggerModule.setup('swagger' , app , document);
  await app.listen(3000);
}
bootstrap();
