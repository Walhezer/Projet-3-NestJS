import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) {}

  async create(createRentalDto: CreateRentalDto, ownerId: number, pictureUrl: string) {
    await this.prisma.rentals.create({
      data: {
        name: createRentalDto.name,
        surface: Number(createRentalDto.surface),
        price: Number(createRentalDto.price),
        description: createRentalDto.description,
        picture: pictureUrl,
        owner_id: ownerId,
      },
    });

    return { message: 'Rental created!' };
  }

  async findAll() {
    const rentalsList = await this.prisma.rentals.findMany({
      include: {
        users: true,
      },
    });

    const formattedRentals = rentalsList.map(rental => {
      const { users, ...rentalData } = rental;
      const { password, ...safeOwner } = users;
      
      return {
        ...rentalData,
        owner: safeOwner,
      };
    });

    return { rentals: formattedRentals };
  }

  async findOne(id: number) {
    const rental = await this.prisma.rentals.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    const { users, ...rentalData } = rental;
    const { password, ...safeOwner } = users;
    
    return {
      ...rentalData,
      owner: safeOwner,
    };
  }

  async update(id: number, updateRentalDto: UpdateRentalDto) {
    await this.prisma.rentals.update({
      where: { id },
      data: {
        name: updateRentalDto.name,
        surface: updateRentalDto.surface ? Number(updateRentalDto.surface) : undefined,
        price: updateRentalDto.price ? Number(updateRentalDto.price) : undefined,
        description: updateRentalDto.description,
      },
    });

    return { message: 'Rental updated!' };
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}