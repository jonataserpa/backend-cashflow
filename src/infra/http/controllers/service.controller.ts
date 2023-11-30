import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateServiceUseCase } from '@application/service/use-cases/create-service';
import { CreateServiceDto } from '../dtos/create-service-dto';
import { ServiceViewModel } from '../view-models/service-view-model';
import {
  GetAllServiceUseCase,
  GetAllServicesRequest,
} from '@application/service/use-cases/get-all-service';
import {
  GetByIdServiceUseCase,
  GetByIdServicesRequest,
} from '@application/service/use-cases/get-by-id-service';
import { UpdateServiceUseCase } from '@application/service/use-cases/update-service';
import {
  RemoveServiceUseCase,
  RemoveServicesRequest,
} from '@application/service/use-cases/remove-service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('service')
@ApiTags('Service')
export class ServiceController {
  constructor(
    private createServiceUseCase: CreateServiceUseCase,
    private getAllServiceUseCase: GetAllServiceUseCase,
    private getByIdServiceUseCase: GetByIdServiceUseCase,
    private updateServiceUseCase: UpdateServiceUseCase,
    private removeServiceUseCase: RemoveServiceUseCase,
  ) {}

  @Get()
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
    name: 'title',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiQuery({
    name: 'cover',
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
    name: 'companyId',
    type: Number,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiOperation({ summary: 'List Service' })
  @ApiOkResponse({
    description: 'List of Services',
    type: CreateServiceDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('description') description: string,
    @Query('title') title: string,
    @Query('cover') cover: string,
    @Query('type') type: string,
    @Query('companyId') companyId: number,
  ) {
    const params: GetAllServicesRequest = {
      params: {
        skip,
        take,
        description,
        title,
        cover,
        type,
        companyId,
      },
    };

    return this.getAllServiceUseCase.execute(params);
  }

  @Get('/:idService')
  @ApiOperation({ summary: 'Get an Service' })
  @ApiOkResponse({ description: 'Get Service', type: CreateServiceDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getByIdService(@Param('idService') idService: number) {
    const params: GetByIdServicesRequest = {
      idService,
    };
    const Service = await this.getByIdServiceUseCase.execute(params);
    return {
      Service: ServiceViewModel.toHTTP(Service),
    };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Service created',
    type: CreateServiceDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() body: CreateServiceDto) {
    const { name, status } = body;

    const { service } = await this.createServiceUseCase.execute({
      name,
      status,
    });

    return {
      Service: ServiceViewModel.toHTTP(service),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an Service' })
  @ApiOkResponse({
    description: 'Service updated successfully',
    type: CreateServiceDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: number, @Body() body: CreateServiceDto) {
    const { name, status } = body;

    const { service } = await this.updateServiceUseCase.execute({
      id,
      name,
      status,
    });

    return {
      service: ServiceViewModel.toHTTP(service),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an Service' })
  @ApiOkResponse({
    description: 'Service deleted successfully',
    type: CreateServiceDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: number) {
    const params: RemoveServicesRequest = {
      id,
    };
    return await this.removeServiceUseCase.execute(params);
  }
}
