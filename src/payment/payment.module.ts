import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Payment]), JwtModule.register({})],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
