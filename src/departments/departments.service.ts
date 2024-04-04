import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './models/department.models';

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel(Department) private departmentRepo:typeof Department ){}
  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepo.create(createDepartmentDto)
  }

  async findAll() {
    return this.departmentRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    return this.departmentRepo.findByPk(id)
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepo.update(updateDepartmentDto,{where:{id},returning:true})[1][0]
  }

  async remove(id: number) {
    return this.departmentRepo.destroy({where:{id}})
  }
}
