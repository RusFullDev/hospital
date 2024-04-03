import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  try {
    const config = new DocumentBuilder()
      .setTitle('Hospital healer')
      .setDescription('Mini project for hospital healer')
      .setVersion('1.0.0')
      .addTag('NestJs,NodeJs,Postgres,Sequalize,JWT,Swagger,Bot,SMS,Mailer')
      .build();

    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    app.use(cookieParser);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    throw new BadRequestException(error);
  }
}
start();
