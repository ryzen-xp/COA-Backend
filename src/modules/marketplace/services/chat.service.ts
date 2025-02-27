import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { ChatRepository } from '../repositories/chat.repository';
import type { CreateChatDto } from '../dtos/chat.dto';
import type { ChatEntity } from '../entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
  // @InjectRepository(ChatRepository)
    private chatRepository: ChatRepository,
  ) {}

  async createMessage(senderId: number, createChatDto: CreateChatDto): Promise<ChatEntity> {
    const chat = this.chatRepository.create({
      senderId,
      receiverId: createChatDto.receiverId,
      message: createChatDto.message,
    });
    return this.chatRepository.save(chat);
  }

  async getUserChats(userId: number): Promise<ChatEntity[]> {
    return this.chatRepository.findUserChats(userId);
  }

  async getUnreadMessages(userId: number): Promise<ChatEntity[]> {
    return this.chatRepository.findUnreadMessages(userId);
  }

  async markAsRead(messageId: number, userId: number): Promise<ChatEntity> {
    const message = await this.chatRepository.findOne({ where: { id: messageId } });
    if (!message || message.receiverId !== userId) {
      throw new Error('Message not found or unauthorized');
    }
    message.read = true;
    return this.chatRepository.save(message);
  }
} 