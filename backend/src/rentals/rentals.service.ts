import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from '../prisma/prisma.service'; // 1. Import de Prisma

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) {}

  create(createRentalDto: CreateRentalDto) {
    return 'This action adds a new rental';
  }

  async findAll() {
    const rentalsList = await this.prisma.rentals.findMany();
    return { rentals: rentalsList };
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}