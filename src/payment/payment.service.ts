import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.models';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentRepo:typeof Payment){}
  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepo.create(createPaymentDto)
  }

  async findAll() {
    return this.paymentRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    return this.paymentRepo.findByPk(id)
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepo.update(updatePaymentDto,{where:{id},returning:true})[1][0]
  }

  async remove(id: number) {
    return this.paymentRepo.destroy({where:{id}})
  }
}
