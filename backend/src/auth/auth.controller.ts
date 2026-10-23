import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Inscrit un nouvel utilisateur dans la base de données.
   */
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Inscription d\'un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé, retourne le token JWT' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Authentifie un utilisateur existant et génère son token d'accès.
   */
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Connexion de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Retourne le token JWT' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Récupère le profil et les informations de l'utilisateur actuellement connecté.
   */
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Récupérer les infos de l\'utilisateur connecté' })
  @ApiResponse({ status: 200, description: 'Retourne les informations de l\'utilisateur' })
  async getProfile(@Request() req: any) {
    return this.authService.getMe(req.user.userId);
  }
}