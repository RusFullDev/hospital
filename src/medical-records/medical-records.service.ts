import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.models';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord) private medicalRecordRepo: typeof MedicalRecord,
  ) {}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordRepo.create(createMedicalRecordDto);
  }

  async findAll() {
    return this.medicalRecordRepo.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return this.medicalRecordRepo.findByPk(id)
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordRepo.update(updateMedicalRecordDto,{where:{id},returning:true})[1][0]
  }

  async remove(id: number) {
    return this.medicalRecordRepo.destroy({where:{id}})
  }
}
