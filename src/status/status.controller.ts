import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './models/status.models';



@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'Add Status' })
  @ApiResponse({ status: 201, type: Status })
  @Post()
  async create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Status' })
  @ApiResponse({ status: 200, type: Status })
  @Get()
  async findAll() {
    return this.statusService.findAll();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get Status By Id' })
  @ApiResponse({ status: 200, type: Status })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Update Status By Id' })
  @ApiResponse({ status: 200, type: Status })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Status By Id' })
  @ApiResponse({ status: 200, type: Status })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
