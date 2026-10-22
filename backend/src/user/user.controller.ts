import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer le profil public d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Retourne les informations de l\'utilisateur sans le mot de passe' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); 
  }
}