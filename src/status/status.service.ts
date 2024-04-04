import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './models/status.models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusRepo: typeof Status) {}
  async create(createStatusDto: CreateStatusDto) {
    return this.statusRepo.create(createStatusDto);
  }

  async findAll() {
    return this.statusRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.statusRepo.findByPk(id);
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    return this.statusRepo.update(updateStatusDto, {
      where: { id },
      returning: true,
    })[1][0];
  }

  async remove(id: number) {
    return this.statusRepo.destroy({ where: { id } });
  }
}
