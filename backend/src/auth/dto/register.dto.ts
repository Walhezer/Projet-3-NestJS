import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ 
    example: 'jean.dupont@email.com', 
    description: 'L\'adresse email de l\'utilisateur' 
  })
  @IsEmail({}, { message: 'Veuillez entrer un adresse email valide.' })
  @IsNotEmpty({ message: "L'adresse email est requise." })
  email: string;

  @ApiProperty({ 
    example: 'Jean Dupont', 
    description: 'Le nom et prénom de l\'utilisateur' 
  })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le nom est requis.' })
  name: string;

  @ApiProperty({ 
    example: 'MotDePasseSecurise123!', 
    description: 'Le mot de passe de l\'utilisateur (minimum 6 caractères)' 
  })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;
}