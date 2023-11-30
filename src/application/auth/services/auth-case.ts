import { PrismaService } from '@infra/database/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagesHelper } from '@helpers/messages.helpers';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.validateCredentials(username, password);

    const payload = {
      sub: user.id,
      username: user.firstName,
      role: user.role,
    };

    const tokens = await this.getTokens(user.id, user.firstName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      authorization: {
        token: this.jwtService.sign(payload),
        refreshToken: tokens.refreshToken,
      },
      user: {
        id: user.id,
        name: user.firstName,
        companyId: user.companyId,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    };
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateCredentials(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: username,
      },
      include: {
        company: {
          select: {
            url: true,
          },
        },
        address: true,
      },
    });

    if (!user || user === null) {
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    }

    if (user.password && bcrypt.compareSync(password, user.password)) {
      return user;
    }
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async logout(userId: string) {
    return this.prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException(MessagesHelper.ACCESS_DENIED);
    }
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException(MessagesHelper.ACCESS_DENIED);
    }

    const tokens = await this.getTokens(user.id, user.firstName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
