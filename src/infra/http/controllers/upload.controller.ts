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

  @Post('/product')
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
  async uploadProduct(@UploadedFile() file) {
    const upload = {
      file,
    };
    return this.createUploadProductUseCase.execute(upload);
  }

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

  @Post('/announcement/:id')
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
  async upload(
    @UploadedFile() file,
    @Param('id') id: number,
  ): Promise<UploadResponse> {
    const upload = {
      id,
      file,
    };
    return await this.createUploadUseCase.execute(upload);
  }

  @Post('multiples')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Delete('/announcement/:id')
  remove(@Param('id') id: number) {
    return this.removeUploadUseCase.execute({ id });
  }

  @Get('/announcement/:filename')
  downloadAnnouncement(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    try {
      const extension = filename.split('.')[1] === 'jpeg';
      let file = 'image/jpeg';
      if (extension) {
        file = 'image/png';
      }
      const readableStream = createReadStream(
        join(process.cwd(), `uploads/${filename}`),
      );
      res.set({
        'Content-Type': file,
      });
      const streamdata = new StreamableFile(readableStream);
      return streamdata;
    } catch (error) {
      return error.message;
    }
  }

  @Get('/user/:filename')
  downloadUser(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    try {
      const extension = filename.split('.')[1] === 'jpeg';
      let file = 'image/jpeg';
      if (extension) {
        file = 'image/png';
      }
      const readableStream = createReadStream(
        join(process.cwd(), `uploads/${filename}`),
      );
      res.set({
        'Content-Type': file,
      });
      const streamdata = new StreamableFile(readableStream);
      return streamdata;
    } catch (error) {
      return error.message;
    }
  }

  @Get('/product/:filename')
  downloadProduct(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    try {
      const extension = filename.split('.')[1] === 'jpeg';
      let file = 'image/jpeg';
      if (extension) {
        file = 'image/png';
      }
      const readableStream = createReadStream(
        join(process.cwd(), `uploads/${filename}`),
      );
      res.set({
        'Content-Type': file,
      });
      const streamdata = new StreamableFile(readableStream);
      return streamdata;
    } catch (error) {
      return error.message;
    }
  }
}
