import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCashFlowDto } from '../dtos/create-cash-flow-dto';
import { CreateCashFlowUseCase } from '@application/cash-flow/use-cases/create-cash-flow';
import { CashFlowViewModel } from '../view-models/cash-flow-view-model';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetAllCashFlowUseCase,
  GetAllCashFlowsRequest,
} from '@application/cash-flow/use-cases/get-all-cash-flow';
import {
  GetByIdCashFlowUseCase,
  GetByIdCashFlowsRequest,
} from '@application/cash-flow/use-cases/get-by-id-cash-flow';
import { UpdateCashFlowUseCase } from '@application/cash-flow/use-cases/update-cash-flow';
import {
  RemoveCashFlowUseCase,
  RemoveCashFlowsRequest,
} from '@application/cash-flow/use-cases/remove-cash-flow';
import { JwtGuard } from '@application/auth/guard/jwt.guard';
import { RoleGuard } from '@application/auth/guard/role.guard';

@Controller('cash-flow')
//@UseGuards(AuthGuard('jwt'))
@ApiTags('cash-flow')
//@ApiBearerAuth()
export class CashFlowController {
  constructor(
    private createCashFlowUseCase: CreateCashFlowUseCase,
    private getAllCashFlowUseCase: GetAllCashFlowUseCase,
    private getByIdCashFlowUseCase: GetByIdCashFlowUseCase,
    private updateCashFlowUseCase: UpdateCashFlowUseCase,
    private removeCashFlowUseCase: RemoveCashFlowUseCase,
  ) {}

  @Get()
  //@UseGuards(JwtGuard, RoleGuard)
  @ApiQuery({
    name: 'skip',
    type: Number,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'description',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'observation',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'paymentedAt',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'createdAt',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiOperation({ summary: 'List CashFlow' })
  @ApiOkResponse({
    description: 'List of CashFlows',
    type: CreateCashFlowDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('description') description?: string,
    @Query('observation') observation?: string,
    @Query('type') type?: string,
    @Query('paymentedAt') paymentedAt?: string,
    @Query('createdAt') createdAt?: string,
  ) {
    const params: GetAllCashFlowsRequest = {
      params: {
        skip,
        take,
        description,
        observation,
        type,
        paymentedAt,
        createdAt,
      },
    };

    return this.getAllCashFlowUseCase.execute(params);
  }

  //@UseGuards(JwtGuard, RoleGuard)
  @Get('/:idCashFlow')
  @ApiOperation({ summary: 'Get an CashFlow' })
  @ApiOkResponse({ description: 'Get CashFlow', type: CreateCashFlowDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getByIdUser(@Param('idCashFlow') idCashFlow: number) {
    const params: GetByIdCashFlowsRequest = {
      idCashFlow,
    };
    const CashFlow = await this.getByIdCashFlowUseCase.execute(params);
    return {
      cashFlow: CashFlowViewModel.toHTTP(CashFlow),
    };
  }

  //@UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'CashFlow register' })
  @ApiCreatedResponse({
    description: 'CashFlow created',
    type: CreateCashFlowDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateCashFlowDto })
  @Post()
  async create(@Body() body: CreateCashFlowDto) {
    const { description, observation, type, companyId, value, paymentedAt } =
      body;

    const { cashFlow } = await this.createCashFlowUseCase.execute({
      description,
      observation,
      type,
      companyId,
      value,
      paymentedAt,
    });

    return {
      cashFlow: CashFlowViewModel.toHTTP(cashFlow),
    };
  }

  @Put(':id')
  //@UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Edit an CashFlow' })
  @ApiOkResponse({
    description: 'CashFlow updated successfully',
    type: CreateCashFlowDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: number, @Body() body: CreateCashFlowDto) {
    const { description, observation, type, companyId, value, paymentedAt } =
      body;

    const { cashFlow } = await this.updateCashFlowUseCase.execute({
      id,
      description,
      observation,
      type,
      companyId,
      value,
      paymentedAt,
    });

    return {
      cashFlow: CashFlowViewModel.toHTTP(cashFlow),
    };
  }

  @Delete(':id')
  //@Roles(['admin', 'user'])
  //@UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete an CashFlow' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: CreateCashFlowDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: number) {
    const params: RemoveCashFlowsRequest = {
      id,
    };
    return await this.removeCashFlowUseCase.execute(params);
  }
}
