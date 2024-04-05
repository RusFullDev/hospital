import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Doctor } from './models/doctor.models';
import { LoginDoctorDto } from './dto/doctor-login.dto';
import { CookieGetter } from 'src/decorators/cookie-getter.decorators';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'register doctor' })
  @ApiResponse({ status: 201, type: Doctor })
  @Post('signUp')
  async registration(
    @Body() createDoctorDto: CreateDoctorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.doctorService.registration(createDoctorDto, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'logged doctor' })
  @ApiResponse({ status: 200, type: Doctor })
  @Post('login')
  async login(
    @Body() loginDoctorDto: LoginDoctorDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.doctorService.login(loginDoctorDto, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'logout doctor' })
  @ApiResponse({ status: 200, type: Doctor })
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.doctorService.logout(refreshToken, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'refresh token doctor' })
  @ApiResponse({ status: 200, type: Doctor })
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token')
    refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.doctorService.refreshToken(+id, refreshToken, res);
  }

  /************************************************************************************** */

  // @Post()
  // async create(@Body() createDoctorDto: CreateDoctorDto) {
  //   return this.doctorService.create(createDoctorDto);
  // }

  @Get()
  async findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
