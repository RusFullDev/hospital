import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './models/room.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Room]), JwtModule.register({})],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
