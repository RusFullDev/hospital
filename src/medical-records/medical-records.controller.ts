import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicalRecord } from './models/medical-record.models';

@ApiTags('medical-records')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'add medical-record' })
  @ApiResponse({ status: 201, type: MedicalRecord })
  @Post()
  async create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'find all medical-record' })
  @ApiResponse({ status: 200, type: MedicalRecord })
  @Get()
  async findAll() {
    return this.medicalRecordsService.findAll();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'find medical-record by id' })
  @ApiResponse({ status: 200, type: MedicalRecord })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'update medical-record by id' })
  @ApiResponse({ status: 200, type: MedicalRecord })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'delete medical-record by id' })
  @ApiResponse({ status: 200, type: MedicalRecord })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
