import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
  companyId: number;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category, companyId } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
      companyId,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
