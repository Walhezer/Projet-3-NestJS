import { Injectable } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) {}

  create(createRentalDto: CreateRentalDto) {
    return 'This action adds a new rental';
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