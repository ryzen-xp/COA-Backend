import { Repository } from 'typeorm';
// import { AppDataSource } from '../../../data-source';
import { Notification } from '../entities/notification.entity';

export const NotificationRepository: Repository<Notification> =
  AppDataSource.getRepository(Notification);
