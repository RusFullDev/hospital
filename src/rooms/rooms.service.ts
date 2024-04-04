import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './models/room.models';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private roomRepo: typeof Room) {}
  async create(createRoomDto: CreateRoomDto) {
    return this.roomRepo.create(createRoomDto)
  }

  async findAll() {
    return this.roomRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    return this.roomRepo.findByPk(id)
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepo.update(updateRoomDto,{where:{id},returning:true})[1][0]
  }

  async remove(id: number) {
    return this.roomRepo.destroy({where:{id}})
  }
}
