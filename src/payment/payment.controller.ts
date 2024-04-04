import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.models';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @HttpCode(201)
  @ApiOperation({ summary: 'Add payments' })
  @ApiResponse({ status: 201, type: Payment })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get All Payments' })
  @ApiResponse({ status: 200, type: Payment })
  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get Payments By ID' })
  @ApiResponse({ status: 200, type: Payment })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Update Payments By ID' })
  @ApiResponse({ status: 200, type: Payment })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Payments By ID' })
  @ApiResponse({ status: 200, type: Payment })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
