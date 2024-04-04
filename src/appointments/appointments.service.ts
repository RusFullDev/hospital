import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.models';
import { privateDecrypt } from 'crypto';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment) private appointmentRepo:typeof Appointment){}
  async create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentRepo.create(createAppointmentDto)
  }

  async findAll() {
    return this.appointmentRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    return this.appointmentRepo.findByPk(id)
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentRepo.update(updateAppointmentDto,{where:{id},returning:true})[1][0]
  }

  async remove(id: number) {
    return this.appointmentRepo.destroy({where:{id}})
  }
}
