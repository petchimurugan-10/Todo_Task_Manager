import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Guard redirects to Google for authentication
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as unknown; // Convert to unknown first
    if (!user || typeof user !== 'object' || !('email' in user) || !('id' in user)) {
      return res.status(401).send('User not authenticated'); // Handle the case where user is undefined
    }
    const { access_token } = await this.authService.login(user as { email: string; id: string });
    res.redirect(`http://localhost:3001?token=${access_token}`);
  }
}