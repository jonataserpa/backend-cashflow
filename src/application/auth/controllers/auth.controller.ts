import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guard/jwt.guard';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from '../role/role.decorator';
import { AuthService } from '../services/auth-case';
import { AuthDto } from '../dto/auth-dto';
import { Request } from 'express';
import { RefreshTokenGuard } from '../guard/refreshToken.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: AuthDto) {
    return await this.authService.login(body.username, body.password);
  }

  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Roles(['admin', 'paid-annoucement'])
  @UseGuards(JwtGuard, RoleGuard)
  @Get('test-auth')
  test(@Req() req) {
    console.log('req:::::', req.user);
    return {
      name: 'Jonata',
    };
  }
}
