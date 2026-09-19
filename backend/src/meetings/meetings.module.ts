import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { MeetingsReminderCronService } from './reminder-cron.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MeetingsController],
  providers: [MeetingsService, MeetingsReminderCronService],
  exports: [MeetingsService],
})
export class MeetingsModule {}
