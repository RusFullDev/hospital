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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Department } from './models/department.models';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'add department' })
  @ApiResponse({ status: 201, type: Department })
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'find all department' })
  @ApiResponse({ status: 200, type: Department })
  @Get()
  async findAll() {
    return this.departmentsService.findAll();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'find department by id' })
  @ApiResponse({ status: 200, type: Department })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(+id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'update department by id' })
  @ApiResponse({ status: 200, type: Department })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'delete department by id' })
  @ApiResponse({ status: 200, type: Department })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departmentsService.remove(+id);
  }
}
