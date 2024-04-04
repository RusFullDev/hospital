import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.models';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from './dto/login-admin.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminServiceRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  /************************************getTokens********************************** */
  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    // const access_token = await this.jwtService.signAsync(payload, {
    //   secret: process.env.ACCESS_TOKEN_KEY,
    //   expiresIn: process.env.ACCESS_TOKEN_TIME,
    // });

    // const refresh_token = await this.jwtService.signAsync(payload, {
    //   secret: process.env.REFRESH_TOKEN_KEY,
    //   expiresIn: process.env.REFRESH_TOKEN_TIME,
    // });
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    // return {
    //   access_token,
    //   refresh_token,
    // };

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  /******************************************registratsiya************************************/

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminServiceRepo.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) {
      throw new BadRequestException('Admin is already registered');
    }
    if (createAdminDto.password != createAdminDto.confirm_password) {
      throw new BadRequestException(' Passwords do not match');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminServiceRepo.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.adminServiceRepo.update(
      { hashed_refresh_token },
      { where: { id: newAdmin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const responce = {
      message: 'Admin registred',
      admin: updateAdmin[1][0],
      tokens,
    };

    return responce;
  }
  /***************************************login**************************************** */
  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminServiceRepo.findOne({ where: { email } });

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    if (!admin.is_active) {
      throw new BadRequestException('Admin is not activate');
    }
    const passwordIsMatch = await bcrypt.compare(
      password,
      admin.hashed_password,
    );
    if (!passwordIsMatch) {
      throw new BadRequestException('Password do not match');
    }
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.adminServiceRepo.update(
      { hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const responce = {
      message: 'Admin logged in',
      admin: updateAdmin[1][0],
      tokens,
    };

    return responce;
  }
  /********************************************logout**************************************/

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not verified');
    }
    const updateAdmin = await this.adminServiceRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: adminData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin_hashed_token: updateAdmin[1][0].hashed_refresh_token,
    };
    return response;
  }
  /***************************************refreshToken**************************************** */
  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('ser not found');
    }
    const admin = await this.adminServiceRepo.findOne({ where: { id: adminId } });

    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminServiceRepo.update(
      { hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin refreshedToken',
      user: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  /****************************************************************************************** */
  async findAll() {
    return this.adminServiceRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    return this.adminServiceRepo.findByPk(id)
  }
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminServiceRepo.update(updateAdminDto,{where:{id},returning:true});
  }

 async remove(id: number) {
    return this.adminServiceRepo.destroy({where:{id}})
  }
}
