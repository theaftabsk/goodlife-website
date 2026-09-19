export class UpdateCrmDto {
  provider?: string;
  webhookUrl?: string;
  apiKey?: string;
  autoSync?: boolean;
  notificationEmail?: string;
  isConnected?: boolean;
}

export class TestCrmDto {
  provider?: string;
  webhookUrl?: string;
  apiKey?: string;
}
