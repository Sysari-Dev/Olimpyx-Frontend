import type { Organization } from "./organization.model";


export interface Notification {
  id: string;
  organization?: Organization;
  title?: string;
  message?: string;
  type?: string;
  originEntity?: string;
  originId?: string;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface UserNotification {
  id: string;
  notification?: Notification;
  userId: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}