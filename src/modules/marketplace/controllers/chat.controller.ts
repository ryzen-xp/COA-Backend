import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import type { ChatService } from '../services/chat.service';
import type { CreateChatDto, MarkMessageReadDto } from '../dtos/chat.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

//   @Post()
//   async sendMessage(
//     @CurrentUser() userId: number,
//     @Body() createChatDto: CreateChatDto
//   ) {
//     return this.chatService.createMessage(userId, createChatDto);
//   }

//   @Get()
//   async getUserChats(@CurrentUser() userId: number) {
//     return this.chatService.getUserChats(userId);
//   }

//   @Get('unread')
//   async getUnreadMessages(@CurrentUser() userId: number) {
//     return this.chatService.getUnreadMessages(userId);
//   }

//   @Post(':id/read')
//   async markAsRead(
//     @CurrentUser() userId: number,
//     @Param('id') messageId: number
//   ) {
//     return this.chatService.markAsRead(messageId, userId);
//   }
}