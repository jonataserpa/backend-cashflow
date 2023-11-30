import * as path from 'path';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';

class S3Storage {
  private client: AWS.S3;

  constructor() {
    this.client = new AWS.S3({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    });
  }

  async saveFile(filename: string): Promise<any> {
    const originalPath = path.resolve('./uploads', filename);

    const ContentType = 'image/*';

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const URL = await this.client
      .upload({
        Bucket: 'easy-food-pt',
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
    return URL;
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'easy-food-pt',
        Key: filename,
      })
      .promise();
  }
}

export default S3Storage;
