import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.models';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginPatientDto } from './dto/patient-login.dto';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient) private patientRepo: typeof Patient,
    private readonly jwtService: JwtService,
  ) {}

  /************************************getTokens********************************** */
  async getTokens(patient: Patient) {
    const payload = {
      id: patient.id,
      is_active: patient.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_PATIENT_KEY,
        expiresIn: process.env.ACCESS_TOKEN_PATIENT_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_PATIENT_KEY,
        expiresIn: process.env.REFRESH_TOKEN_PATIENT_TIME,
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  /******************************************registratsiya************************************/

  async registration(createPatientDto, res: Response) {
    const doctor = await this.patientRepo.findOne({
      where: { email: createPatientDto.email },
    });
    if (doctor) {
      throw new BadRequestException('Patient is already registered');
    }
    if (createPatientDto.password != createPatientDto.confirm_password) {
      throw new BadRequestException(' Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(createPatientDto.password, 7);
    // createPatientDto.password = hashed_password;

    const newPatient = await this.patientRepo.create({
      ...createPatientDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newPatient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatePatient = await this.patientRepo.update(
      { hashed_refresh_token },
      { where: { id: newPatient.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const responce = {
      message: 'Patient registred',
      doctor: updatePatient[1][0],
      tokens,
    };

    return responce;
  }
  /***************************************login**************************************** */
  async login(loginPatientDto: LoginPatientDto, res: Response) {
    const { email, password } = loginPatientDto;
    const patient = await this.patientRepo.findOne({ where: { email } });

    if (!patient) {
      throw new BadRequestException('Patient not found');
    }
    if (!patient.is_active) {
      throw new BadRequestException('Patient is not activate');
    }
    const passwordIsMatch = await bcrypt.compare(
      password,
      patient.hashed_password,
    );
    if (!passwordIsMatch) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(patient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatePatient = await this.patientRepo.update(
      { hashed_refresh_token },
      { where: { id: patient.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const responce = {
      message: 'Patient logged in',
      patient: updatePatient[1][0],
      tokens,
    };

    return responce;
  }
  /********************************************logout**************************************/

  async logout(refreshToken: string, res: Response) {
    const patientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!patientData) {
      throw new ForbiddenException('Patient not verified');
    }
    const updatePatient = await this.patientRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: patientData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Patient logged out successfully',
      patient_hashed_token: updatePatient[1][0].hashed_refresh_token,
    };
    return response;
  }
  /***************************************refreshToken**************************************** */
  async refreshToken(patientId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (patientId !== decodedToken['id']) {
      throw new BadRequestException('ser not found');
    }
    const patient = await this.patientRepo.findOne({
      where: { id: patientId },
    });

    if (!patient || !patient.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      patient.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(patient);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedPatient = await this.patientRepo.update(
      { hashed_refresh_token },
      { where: { id: patient.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Patient refreshedToken',
      user: updatedPatient[1][0],
      tokens,
    };
    return response;
  }

  /**************************************************************************************** */
  // async create(createPatientDto: CreatePatientDto) {
  //   return this.patientRepo.create(createPatientDto);
  // }

  async findAll() {
    return this.patientRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.patientRepo.findByPk(id);
  }

  // async update(id: number, updatePatientDto:CreatePatientDto) {
  //   return this.patientRepo.update(updatePatientDto, {
  //     where: { id },
  //     returning: true,
  //   })[1][0];
  // }

  async remove(id: number) {
    return this.patientRepo.destroy({ where: { id } });
  }
}
