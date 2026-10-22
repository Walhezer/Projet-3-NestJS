import { Controller, Get, Post, Body, Put, Param, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Rentals')
@ApiBearerAuth()
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle location' })
  @ApiResponse({ status: 201, description: 'Rental created!' })
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  create(
    @Body() createRentalDto: CreateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any
  ) {
    const ownerId = req.user.userId;
    const pictureUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    return this.rentalsService.create(createRentalDto, ownerId, pictureUrl);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les locations' })
  @ApiResponse({ status: 200, description: 'Retourne le tableau des locations' })
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une location par son id' })
  @ApiResponse({ status: 200, description: 'Retourne la location et les infos du propriétaire' })
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une location' })
  @ApiResponse({ status: 200, description: 'Rental updated!' })
  @UseInterceptors(NoFilesInterceptor())
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalsService.update(+id, updateRentalDto);
  }
}