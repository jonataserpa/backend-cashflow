import { BusinessHelper } from '@helpers/business.helpers';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('business')
@ApiTags('Business')
export class BusinessController {
  @Get()
  @ApiOperation({ summary: 'List business' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAll() {
    const business = {
      data: {
        '1': BusinessHelper.AGRICULTOR,
        '2': BusinessHelper.ATACADISTA,
        '3': BusinessHelper.CEASA,
        '4': BusinessHelper.CONSUMIDOR_FINAL,
        '5': BusinessHelper.COOPERTATIVA,
        '6': BusinessHelper.DISTRIBUIDOR,
        '7': BusinessHelper.GOVERNO,
        '8': BusinessHelper.INDUSTRIA,
        '9': BusinessHelper.MINI_MERCADO,
        '10': BusinessHelper.RESTAURANTE,
        '11': BusinessHelper.PRODUTO_RURAL_1,
        '12': BusinessHelper.PRODUTO_RURAL_2,
        '13': BusinessHelper.PRODUTO_RURAL_3,
        '14': BusinessHelper.REPRESENTANTE,
        '15': BusinessHelper.SUPER_MERCADO_1,
        '16': BusinessHelper.SUPER_MERCADO_2,
        '17': BusinessHelper.SUPER_MERCADO_3,
        '18': BusinessHelper.OUTROS,
      },
    };
    return business;
  }
}
