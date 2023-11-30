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
import { CreateCategorieUseCase } from '@application/categorie/use-cases/create-categorie';
import { CreateCategorieDto } from '../dtos/create-categorie-dto';
import { CategorieViewModel } from '../view-models/categorie-view-model';
import {
  GetAllCategorieUseCase,
  GetAllCategoriesRequest,
} from '@application/categorie/use-cases/get-all-categorie';
import {
  GetByIdCategorieUseCase,
  GetByIdCategoriesRequest,
} from '@application/categorie/use-cases/get-by-id-categorie';
import { UpdateCategorieUseCase } from '@application/categorie/use-cases/update-categorie';
import {
  RemoveCategorieUseCase,
  RemoveCategoriesRequest,
} from '@application/categorie/use-cases/remove-categorie';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@application/auth/role/role.decorator';
import { JwtGuard } from '@application/auth/guard/jwt.guard';
import { RoleGuard } from '@application/auth/guard/role.guard';

@Controller('categorie')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Categorie')
@ApiBearerAuth()
export class CategorieController {
  constructor(
    private createCategorieUseCase: CreateCategorieUseCase,
    private getAllCategorieUseCase: GetAllCategorieUseCase,
    private getByIdCategorieUseCase: GetByIdCategorieUseCase,
    private updateCategorieUseCase: UpdateCategorieUseCase,
    private removeCategorieUseCase: RemoveCategorieUseCase,
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
  @ApiOperation({ summary: 'List categorie' })
  @ApiOkResponse({
    description: 'List of categories',
    type: CreateCategorieDto,
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
    const params: GetAllCategoriesRequest = {
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

    return this.getAllCategorieUseCase.execute(params);
  }

  @Get('/:idCategorie')
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Get an categorie' })
  @ApiOkResponse({ description: 'Get categorie', type: CreateCategorieDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getByIdCategorie(@Param('idCategorie') idCategorie: number) {
    const params: GetByIdCategoriesRequest = {
      idCategorie,
    };
    const categorie = await this.getByIdCategorieUseCase.execute(params);
    return {
      categorie: CategorieViewModel.toHTTP(categorie),
    };
  }

  @Post()
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiCreatedResponse({
    description: 'Categorie created',
    type: CreateCategorieDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() body: CreateCategorieDto) {
    const { title, uri, description, cover, type, companyId } = body;

    const { categorie } = await this.createCategorieUseCase.execute({
      title,
      uri,
      description,
      cover,
      type,
      companyId,
    });

    return {
      categorie: CategorieViewModel.toHTTP(categorie),
    };
  }

  @Put(':id')
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Edit an categorie' })
  @ApiOkResponse({
    description: 'Categorie updated successfully',
    type: CreateCategorieDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') id: number, @Body() body: CreateCategorieDto) {
    const { title, uri, description, cover, type, companyId } = body;

    const { categorie } = await this.updateCategorieUseCase.execute({
      id,
      title,
      uri,
      description,
      cover,
      type,
      companyId,
    });

    return {
      categorie: CategorieViewModel.toHTTP(categorie),
    };
  }

  @Delete(':id')
  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete an categorie' })
  @ApiOkResponse({
    description: 'Categorie deleted successfully',
    type: CreateCategorieDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(@Param('id') id: number) {
    const params: RemoveCategoriesRequest = {
      id,
    };
    return await this.removeCategorieUseCase.execute(params);
  }
}
