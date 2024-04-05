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
  Put,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './models/patient.models';
import { Response } from 'express';
import { LoginPatientDto } from './dto/patient-login.dto';
import { CookieGetter } from 'src/decorators/cookie-getter.decorators';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'register patient' })
  @ApiResponse({ status: 201, type: Patient })
  @Post('signUp')
  async registration(
    @Body() createPatientDto: CreatePatientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientService.registration(createPatientDto, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'logged patient' })
  @ApiResponse({ status: 200, type: Patient })
  @Post('login')
  async login(
    @Body() loginPatientDto: LoginPatientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.patientService.login(loginPatientDto, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'logout patient' })
  @ApiResponse({ status: 200, type: Patient })
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.patientService.logout(refreshToken, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'refresh token patient' })
  @ApiResponse({ status: 200, type: Patient })
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token')
    refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.patientService.refreshToken(+id, refreshToken, res);
  }
  /***************************************************************************************** */

  // @Post()
  // create(@Body() createPatientDto: CreatePatientDto) {
  //   return this.patientService.create(createPatientDto);
  // }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
  //   return this.patientService.update(+id, updatePatientDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
