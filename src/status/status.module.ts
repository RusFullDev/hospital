import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from './models/status.models';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [SequelizeModule.forFeature([Status]), JwtModule.register({})],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
