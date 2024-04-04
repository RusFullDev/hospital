import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Service } from './models/service.models';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'Add services' })
  @ApiResponse({ status: 201, type: Service })
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get All services' })
  @ApiResponse({ status: 200, type: Service })
  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get Services By ID' })
  @ApiResponse({ status: 200, type: Service })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Update Services By ID' })
  @ApiResponse({ status: 200, type: Service })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Services By ID' })
  @ApiResponse({ status: 200, type: Service })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
