import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    await this.prisma.messages.create({
      data: {
        message: createMessageDto.message,
        user_id: createMessageDto.user_id,
        rental_id: createMessageDto.rental_id,
      },
    });

    return { message: 'Message sent!' };
  }
}