import { Content } from '@application/notification/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/notification/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'recipient-2',
    companyId: 1,
    ...override,
  });
}
