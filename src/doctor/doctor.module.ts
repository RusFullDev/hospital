import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Doctor]), JwtModule.register({})],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
