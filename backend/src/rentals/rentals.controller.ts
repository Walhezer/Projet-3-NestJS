import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
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
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    return this.rentalsService.update(+id, updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalsService.remove(+id);
  }
}