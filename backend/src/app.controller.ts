import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**
   * Point d'entrée de base de l'API permettant de vérifier que le serveur est bien fonctionnel.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}