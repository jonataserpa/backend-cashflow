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
import { CreateCompanyDto } from '../dtos/create-company-dto';
import { CreateCompanyUseCase } from '@application/company/use-cases/create-company';
import { CompanyViewModel } from '../view-models/company-view-model';
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
  GetAllCompanyUseCase,
  GetAllCompanysRequest,
} from '@application/company/use-cases/get-all-company';
import {
  GetByIdCompanyUseCase,
  GetByIdCompanysRequest,
} from '@application/company/use-cases/get-by-id-company';
import { UpdateCompanyUseCase } from '@application/company/use-cases/update-company';
import {
  RemoveCompanyUseCase,
  RemoveCompanysRequest,
} from '@application/company/use-cases/remove-company';
import { Roles } from '@application/auth/role/role.decorator';
import { JwtGuard } from '@application/auth/guard/jwt.guard';
import { RoleGuard } from '@application/auth/guard/role.guard';

@Controller('company')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Company')
@ApiBearerAuth()
export class CompanyController {
  constructor(
    private createCompanyUseCase: CreateCompanyUseCase,
    private getAllCompanyUseCase: GetAllCompanyUseCase,
    private getByIdCompanyUseCase: GetByIdCompanyUseCase,
    private updateCompanyUseCase: UpdateCompanyUseCase,
    private removeCompanyUseCase: RemoveCompanyUseCase,
  ) {}

  @Get()
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
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
    name: 'filter',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  @ApiOperation({ summary: 'List company' })
  @ApiOkResponse({
    description: 'List of companys',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('filter') filter?: string,
  ) {
    const params: GetAllCompanysRequest = {
      params: {
        skip,
        take,
        filter,
      },
    };

    return this.getAllCompanyUseCase.execute(params);
  }

  @Get('/:idCompany')
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Get an company' })
  @ApiOkResponse({ description: 'Get company', type: CreateCompanyDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getByIdUser(@Param('idCompany') idCompany: number) {
    const params: GetByIdCompanysRequest = {
      idCompany,
    };
    const company = await this.getByIdCompanyUseCase.execute(params);
    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @ApiOperation({ summary: 'Company register' })
  @ApiCreatedResponse({
    description: 'Company created',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateCompanyDto })
  @Post()
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  async create(@Body() body: CreateCompanyDto) {
    const {
      status,
      name,
      socialReason,
      url,
      cnpj,
      email,
      phone,
      cellphone,
      responsible,
      emailResponsible,
      followup,
    } = body;

    const { company } = await this.createCompanyUseCase.execute({
      status,
      name,
      socialReason,
      url,
      cnpj,
      email,
      phone,
      cellphone,
      responsible,
      emailResponsible,
      followup,
    });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Put(':id')
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Edit an company' })
  @ApiOkResponse({
    description: 'Company updated successfully',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: number, @Body() body: CreateCompanyDto) {
    const {
      status,
      name,
      socialReason,
      url,
      cnpj,
      email,
      phone,
      cellphone,
      responsible,
      emailResponsible,
      followup,
    } = body;

    const { company } = await this.updateCompanyUseCase.execute({
      id,
      status,
      name,
      socialReason,
      url,
      cnpj,
      email,
      phone,
      cellphone,
      responsible,
      emailResponsible,
      followup,
    });

    return {
      company: CompanyViewModel.toHTTP(company),
    };
  }

  @Delete(':id')
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete an company' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: CreateCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: number) {
    const params: RemoveCompanysRequest = {
      id,
    };
    return await this.removeCompanyUseCase.execute(params);
  }
}
