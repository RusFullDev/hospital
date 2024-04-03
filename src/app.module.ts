import { Module } from '@nestjs/common';

import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
