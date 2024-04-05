import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.models';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDoctorDto } from './dto/doctor-login.dto';
import { Response } from 'express';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor) private doctorRepo: typeof Doctor,
    private readonly jwtService: JwtService,
  ) {}

  /************************************getTokens********************************** */
  async getTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_DOCTOR_KEY,
      expiresIn: process.env.ACCESS_TOKEN_DOCTOR_TIME,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_DOCTOR_KEY,
      expiresIn: process.env.REFRESH_TOKEN_DOCTOR_TIME,
    });

    return {
      access_token,
      refresh_token,
    };
  }
  /******************************************registratsiya************************************/

  async registration(createDoctorDto: CreateDoctorDto, res: Response) {
    const doctor = await this.doctorRepo.findOne({
      where: { email: createDoctorDto.email },
    });
    if (doctor) {
      throw new BadRequestException('Doctor is already registered');
    }
    if (createDoctorDto.password != createDoctorDto.confirm_password) {
      throw new BadRequestException(' Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(createDoctorDto.password, 7);
    const newDoctor = await this.doctorRepo.create({
      ...createDoctorDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newDoctor);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateDoctor = await this.doctorRepo.update(
      { hashed_refresh_token },
      { where: { id: newDoctor.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const responce = {
      message: 'Doctor registred',
      doctor: updateDoctor[1][0],
      tokens,
    };

    return responce;
  }
  /***************************************login**************************************** */
  async login(loginDoctorDto: LoginDoctorDto, res: Response) {
    const { email, password } = loginDoctorDto;
    const doctor = await this.doctorRepo.findOne({ where: { email } });

    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }
    if (!doctor.is_active) {
      throw new BadRequestException('Doctor is not activate');
    }
    const passwordIsMatch = await bcrypt.compare(
      password,
      doctor.hashed_password,
    );
    if (!passwordIsMatch) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(doctor);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateDoctor = await this.doctorRepo.update(
      { hashed_refresh_token },
      { where: { id: doctor.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const responce = {
      message: 'Doctor logged in',
      doctor: updateDoctor[1][0],
      tokens,
    };

    return responce;
  }
  /********************************************logout**************************************/

  async logout(refreshToken: string, res: Response) {
    const doctorData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!doctorData) {
      throw new ForbiddenException('Doctor not verified');
    }
    const updateDoctor = await this.doctorRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: doctorData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Doctor logged out successfully',
      doctor_hashed_token: updateDoctor[1][0].hashed_refresh_token,
    };
    return response;
  }
  /***************************************refreshToken**************************************** */
  async refreshToken(doctorId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (doctorId !== decodedToken['id']) {
      throw new BadRequestException('ser not found');
    }
    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorId },
    });

    if (!doctor || !doctor.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      doctor.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(doctor);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedDoctor = await this.doctorRepo.update(
      { hashed_refresh_token },
      { where: { id: doctor.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Doctor refreshedToken',
      user: updatedDoctor[1][0],
      tokens,
    };
    return response;
  }
  /******************************************************************************* */
  // async create(createDoctorDto: CreateDoctorDto) {
  //   return this.doctorRepo.create(createDoctorDto);
  // }

  async findAll() {
    return this.doctorRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.doctorRepo.findByPk(id);
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorRepo.update(updateDoctorDto, {
      where: { id },
      returning: true,
    })[1][0];
  }

  async remove(id: number) {
    return this.doctorRepo.destroy({ where: { id } });
  }
}
