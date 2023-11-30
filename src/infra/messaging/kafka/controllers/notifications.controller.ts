import { SendNotification } from '@application/notification/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
  companyId: number;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(
    @Payload()
    { content, category, recipientId, companyId }: SendNotificationPayload,
  ) {
    console.log(content);
    await this.sendNotification.execute({
      content,
      category,
      recipientId,
      companyId,
    });
  }
}
