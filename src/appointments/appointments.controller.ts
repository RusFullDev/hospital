import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Appointment } from './models/appointment.models';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'add appointment' })
  @ApiResponse({ status: 201, type: Appointment })
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'get all appointment' })
  @ApiResponse({ status: 200, type: Appointment })
  @Get()
  async findAll() {
    return this.appointmentsService.findAll();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'get appointment by id' })
  @ApiResponse({ status: 200, type: Appointment })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'update appointment by id' })
  @ApiResponse({ status: 200, type: Appointment })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'delete appointment by id' })
  @ApiResponse({ status: 200, type: Appointment })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
