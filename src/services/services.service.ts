import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './models/service.models';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service) private servicesRepo: typeof Service) {}
  async create(createServiceDto: CreateServiceDto) {
    return this.servicesRepo.create(createServiceDto)
  }

  async findAll() {
    return this.servicesRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    return this.servicesRepo.findByPk(id)
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.servicesRepo.update(updateServiceDto,{where:{id},returning:true})[1][0]
  }

  async remove(id: number) {
    return this.servicesRepo.destroy({where:{id}})
  }
}
