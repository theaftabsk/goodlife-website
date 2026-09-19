import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MeetingsReminderCronService implements OnModuleInit, OnModuleDestroy {
  private timer: NodeJS.Timeout | null = null;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    // Run reminder check every 5 minutes
    this.timer = setInterval(() => {
      this.checkAndDispatchReminders().catch((err) => {
        console.error('[REMINDER CRON ERROR]', err);
      });
    }, 5 * 60 * 1000);

    // Initial check after 10 seconds
    setTimeout(() => {
      this.checkAndDispatchReminders().catch(() => {});
    }, 10000);
  }

  onModuleDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  async checkAndDispatchReminders() {
    const config = await (this.prisma as any).calendarConfig.findUnique({
      where: { id: 'default' },
    });

    if (config && config.autoRemindersEnabled === false) {
      return;
    }

    const now = new Date();
    const future24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // Find all scheduled meetings within the next 24 hours
    const upcoming = await (this.prisma as any).meetingBooking.findMany({
      where: {
        status: 'Scheduled',
        meetingDate: {
          gte: now,
          lte: future24h,
        },
      },
    });

    for (const meeting of upcoming) {
      const diffMs = new Date(meeting.meetingDate).getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // Check 24-hour reminder
      if (diffHours <= 24 && diffHours > 1 && !meeting.reminder24hSent) {
        if (!config || config.reminder24hEnabled !== false) {
          console.log(`[AUTOMATED 24H REMINDER] Sending 24h reminder to ${meeting.clientEmail} for meeting on ${meeting.meetingTime}`);
          await (this.prisma as any).meetingBooking.update({
            where: { id: meeting.id },
            data: { reminder24hSent: true },
          });
        }
      }

      // Check 1-hour reminder
      if (diffHours <= 1 && diffHours > 0 && !meeting.reminder1hSent) {
        if (!config || config.reminder1hEnabled !== false) {
          console.log(`[AUTOMATED 1H REMINDER] Sending 1h urgent reminder to ${meeting.clientEmail} for meeting at ${meeting.meetingTime}`);
          await (this.prisma as any).meetingBooking.update({
            where: { id: meeting.id },
            data: { reminder1hSent: true },
          });
        }
      }
    }
  }
}
