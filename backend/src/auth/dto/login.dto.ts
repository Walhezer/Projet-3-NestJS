import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    example: 'jean.dupont@email.com', 
    description: 'L\'adresse email de l\'utilisateur' 
  })
  @IsEmail({}, { message: "Format d'email invalide" })
  @IsNotEmpty({ message: "L'adresse email est requise." })
  email: string;

  @ApiProperty({ 
    example: 'MotDePasseSecurise123!', 
    description: 'Le mot de passe secret' 
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  password: string;
}