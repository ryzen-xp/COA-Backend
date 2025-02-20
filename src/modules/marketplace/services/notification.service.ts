import { Notification } from '../entities/notification.entity';
import { NotificationRepository } from '../repositories/notification.repository';
import { CreateNotificationDto } from '../dtos/notification.dto';

class NotificationService {
    
  async createNotification(dto: CreateNotificationDto): Promise<Notification> {
    const notification = NotificationRepository.create({
      userId: dto.userId,
      type: dto.type,
      message: dto.message,
      read: false,
    });
    return NotificationRepository.save(notification);
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return NotificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getUnreadNotifications(userId: number): Promise<Notification[]> {
    return NotificationRepository.find({
      where: { userId, read: false },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await NotificationRepository.findOne({ where: { id: notificationId } });
    if (!notification) {
      throw new Error('Notification not found');
    }
    notification.read = true;
    return NotificationRepository.save(notification);
  }
}

export default new NotificationService();
