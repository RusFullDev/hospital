import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './models/service.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Service]), JwtModule.register({})],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
