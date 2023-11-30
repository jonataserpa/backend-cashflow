import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import {
  IUser,
  UploadRepository,
} from '@application/upload/repositories/upload.respository';
import S3Storage from '@infra/s3-storage/S3Storage';

@Injectable()
export class PrismaUploadRepository implements UploadRepository {
  constructor(private prisma: PrismaService) {}

  async createUploadS3(file: Express.Multer.File) {
    const s3 = new S3Storage();
    const url = await s3.saveFile(file.filename);
    return url.Location;
  }

  async create(file: Express.Multer.File, id: number): Promise<void> {
    const nameS3 = await this.createUploadS3(file);

    const attachment = {
      announcementId: Number(id),
      image: nameS3,
      isDefault: 0,
      position: '',
    };

    await this.prisma.attachment.create({
      data: attachment,
    });
  }

  async createUploadUser(file: Express.Multer.File): Promise<IUser> {
    const nameS3 = await this.createUploadS3(file);

    return {
      photo: nameS3,
    };
  }

  async createUploadProduct(file: Express.Multer.File): Promise<IUser> {
    const nameS3 = await this.createUploadS3(file);

    return {
      photo: nameS3,
    };
  }

  async remove(id: number) {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id: Number(id) },
    });

    if (!attachment) {
      throw new Error(`attachment does not exist`);
    }

    await this.prisma.attachment.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id: Number(id) },
    });
  }
}
