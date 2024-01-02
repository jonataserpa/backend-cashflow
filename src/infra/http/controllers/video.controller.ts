import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVideoBody } from '../dtos/create-video-body';
import { SendVideoUseCase } from '@application/video/use-cases/send-video';

@Controller('video')
@ApiTags('Video')
export class VideoController {
  constructor(private sendVideoUseCase: SendVideoUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Video message' })
  @ApiCreatedResponse({
    description: 'Video message',
    type: CreateVideoBody,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiBody({ type: CreateVideoBody })
  async create(@Body() body: CreateVideoBody) {
    const { prompt } = body;

    const { resultVideo } = await this.sendVideoUseCase.execute({
      prompt,
    });

    return {
      video: resultVideo,
    };
  }
}
