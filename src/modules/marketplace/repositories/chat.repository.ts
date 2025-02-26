import { EntityRepository, Repository } from 'typeorm';
import { ChatEntity } from '../entities/chat.entity';

@EntityRepository(ChatEntity)
export class ChatRepository extends Repository<ChatEntity> {
  async findUserChats(userId: number) {
    return this.find({
      where: [
        { senderId: userId },
        { receiverId: userId }
      ],
      order: {
        createdAt: 'DESC'
      }
    });
  }

  async findUnreadMessages(userId: number) {
    return this.find({
      where: {
        receiverId: userId,
        read: false
      }
    });
  }
} 