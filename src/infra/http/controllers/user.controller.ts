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
import { CreateUserUseCase } from '@application/user/use-cases/create-user';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UserViewModel } from '../view-models/user-view-model';
import {
  GetAllUserUseCase,
  GetAllUsersRequest,
} from '@application/user/use-cases/get-all-user';
import {
  GetByIdUserUseCase,
  GetByIdUsersRequest,
} from '@application/user/use-cases/get-by-id-user';
import { UpdateUserUseCase } from '@application/user/use-cases/update-user';
import {
  RemoveUserUseCase,
  RemoveUsersRequest,
} from '@application/user/use-cases/remove-user';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { Roles } from '@application/auth/role/role.decorator';
import { JwtGuard } from '@application/auth/guard/jwt.guard';
import { RoleGuard } from '@application/auth/guard/role.guard';

@Controller('user')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUserUseCase: GetAllUserUseCase,
    private getByIdUserUseCase: GetByIdUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private removeUserUseCase: RemoveUserUseCase,
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
    name: 'filter',
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
  @ApiOperation({ summary: 'List user' })
  @ApiOkResponse({
    description: 'List of users',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('filter') filter?: string,
    @Query('companyId') companyId?: number,
  ) {
    const params: GetAllUsersRequest = {
      params: {
        skip,
        take,
        filter,
        companyId,
      },
    };

    return this.getAllUserUseCase.execute(params);
  }

  @Get('/:idUser')
  @ApiOperation({ summary: 'Get an user' })
  @ApiOkResponse({ description: 'Get user', type: CreateUserDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getByIdUser(@Param('idUser') idUser: number) {
    const params: GetByIdUsersRequest = {
      idUser,
    };
    const user = await this.getByIdUserUseCase.execute(params);
    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @ApiOperation({ summary: 'User register' })
  @ApiCreatedResponse({
    description: 'User created',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() body: CreateUserDto) {
    const {
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      photo,
      business,
      password,
      companyId,
      address,
      image,
    } = body;

    const { user } = await this.createUserUseCase.execute({
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      photo,
      business,
      password,
      companyId,
      address,
      image,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an user' })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UpdateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    const {
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      business,
      companyId,
      address,
      image,
      photo,
    } = body;

    const { user } = await this.updateUserUseCase.execute({
      id,
      firstName,
      lastName,
      phone,
      email,
      genre,
      dateBorn,
      documentType,
      document,
      business,
      companyId,
      address,
      image,
      photo,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }

  @Delete(':id')
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete an user' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: number) {
    const params: RemoveUsersRequest = {
      id,
    };
    return await this.removeUserUseCase.execute(params);
  }
}
