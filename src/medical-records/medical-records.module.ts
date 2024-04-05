import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([MedicalRecord]),
    JwtModule.register({}),
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
