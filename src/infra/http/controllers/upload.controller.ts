import {
  CreateUploadUseCase,
  UploadResponse,
} from '@application/upload/use-cases/create-upload-announcement';
import { CreateUploadUserUseCase } from '@application/upload/use-cases/create-upload-user';
import { CreateUploadProductUseCase } from '@application/upload/use-cases/create-upload-product';
import { RemoveUploadUseCase } from '@application/upload/use-cases/remove-upload';
import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Get,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as multer from 'multer';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Controller('upload')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Upload')
@ApiBearerAuth()
export class UploadController {
  constructor(
    private readonly createUploadUseCase: CreateUploadUseCase,
    private readonly createUploadUserUseCase: CreateUploadUserUseCase,
    private readonly createUploadProductUseCase: CreateUploadProductUseCase,
    private readonly removeUploadUseCase: RemoveUploadUseCase,
  ) {}

  @Post('/user')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
      limits: { fieldNameSize: 300, fileSize: 50485760 }, // limit total size to 5MB
      storage: multer.diskStorage({
        destination: './uploads',
        filename(request, file, callback) {
          const uniqueSuffix =
            Date.now() + '_' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
    }),
  )
  async uploadUser(@UploadedFile() file) {
    const upload = {
      file,
    };
    return this.createUploadUserUseCase.execute(upload);
  }

  @Post('multiples')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
