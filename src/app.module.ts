import { Module } from '@nestjs/common';

import { PaymentModule } from './payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './payment/models/payment.models';
import { ServicesModule } from './services/services.module';
import { Service } from './services/models/service.models';
import { StatusModule } from './status/status.module';
import { Status } from './status/models/status.models';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/models/room.models';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { MedicalRecord } from './medical-records/models/medical-record.models';
import { DepartmentsModule } from './departments/departments.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/models/appointment.models';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.models';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

import { Patient } from './patient/models/patient.models';
import { Department } from './departments/models/department.models';
import { Doctor } from './doctor/models/doctor.models';


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
      models: [
        Payment,
        Service,
        Status,
        Room,
        MedicalRecord,
        Appointment,
        Admin,
        Department,
        Doctor,
        Patient
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    PaymentModule,
    ServicesModule,
    StatusModule,
    RoomsModule,
    MedicalRecordsModule,
    DepartmentsModule,
    AppointmentsModule,
    AdminModule,
    DoctorModule,
    PatientModule,

  ],
})
export class AppModule {}
