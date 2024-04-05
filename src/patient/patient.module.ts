import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Patient]), JwtModule.register({})],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
