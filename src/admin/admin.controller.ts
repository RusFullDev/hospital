import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.models';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from 'src/decorators/cookie-getter.decorators';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreatorGuards } from 'src/guards/creator.guard';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(CreatorGuards)
  @HttpCode(201)
  @ApiOperation({ summary: 'register admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signUp')
  async registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'logged admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('login')
  async login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'logout admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @UseGuards(AdminGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'refresh token admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: number,
    @CookieGetter('refresh_token')
    refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @UseGuards(AdminGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'get all admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'get admin by id' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'updated admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AdminGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'deleted admin' })
  @ApiResponse({ status: 200, type: Admin })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
