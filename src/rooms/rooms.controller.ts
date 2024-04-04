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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Room } from './models/room.models';
@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'Add rooms' })
  @ApiResponse({ status: 201, type: Room })
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get All rooms' })
  @ApiResponse({ status: 200, type: Room })
  @Get()
  async findAll() {
    return this.roomsService.findAll();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get rooms By ID' })
  @ApiResponse({ status: 200, type: Room })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Update rooms By ID' })
  @ApiResponse({ status: 200, type: Room })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Delete rooms By ID' })
  @ApiResponse({ status: 200, type: Room })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
