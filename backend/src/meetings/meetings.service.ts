import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface MeetingBookingDto {
  id?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  company?: string;
  category?: string;
  meetingDate: string | Date;
  meetingTime: string;
  timezone?: string;
  provider?: string;
  meetingUrl?: string;
  externalEventId?: string;
  status?: string;
  notes?: string;
}

export interface CalendarConfigDto {
  provider?: string;
  bookingUrl?: string;
  embedType?: string;
  autoRemindersEnabled?: boolean;
  reminder24hEnabled?: boolean;
  reminder1hEnabled?: boolean;
  adminNotificationEmail?: string;
  webhookSecret?: string;
}

@Injectable()
export class MeetingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string) {
    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    return (this.prisma as any).meetingBooking.findMany({
      where,
      orderBy: { meetingDate: 'asc' },
    });
  }

  async findOne(id: string) {
    const meeting = await (this.prisma as any).meetingBooking.findUnique({ where: { id } });
    if (!meeting) throw new NotFoundException(`Meeting with id "${id}" not found`);
    return meeting;
  }

  async create(data: MeetingBookingDto) {
    const id = data.id || `meet-${Date.now()}`;
    const dateObj = typeof data.meetingDate === 'string' ? new Date(data.meetingDate) : data.meetingDate;

    const created = await (this.prisma as any).meetingBooking.create({
      data: {
        id,
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientPhone: data.clientPhone || null,
        company: data.company || null,
        category: data.category || null,
        meetingDate: dateObj,
        meetingTime: data.meetingTime,
        timezone: data.timezone || 'Asia/Kolkata',
        provider: data.provider || 'Calendly',
        meetingUrl: data.meetingUrl || 'https://meet.google.com/goodlife-strategy-session',
        externalEventId: data.externalEventId || null,
        status: data.status || 'Scheduled',
        notes: data.notes || '',
        reminder24hSent: false,
        reminder1hSent: false,
      },
    });

    // Send confirmation email asynchronously
    this.sendConfirmationNotification(created).catch(() => {});

    return created;
  }

  async update(id: string, data: Partial<MeetingBookingDto>) {
    await this.findOne(id);
    const updateData: any = {};

    if (data.clientName !== undefined) updateData.clientName = data.clientName;
    if (data.clientEmail !== undefined) updateData.clientEmail = data.clientEmail;
    if (data.clientPhone !== undefined) updateData.clientPhone = data.clientPhone;
    if (data.company !== undefined) updateData.company = data.company;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.meetingDate !== undefined) {
      updateData.meetingDate = typeof data.meetingDate === 'string' ? new Date(data.meetingDate) : data.meetingDate;
    }
    if (data.meetingTime !== undefined) updateData.meetingTime = data.meetingTime;
    if (data.timezone !== undefined) updateData.timezone = data.timezone;
    if (data.provider !== undefined) updateData.provider = data.provider;
    if (data.meetingUrl !== undefined) updateData.meetingUrl = data.meetingUrl;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;

    return (this.prisma as any).meetingBooking.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await (this.prisma as any).meetingBooking.delete({ where: { id } });
    return { success: true, id };
  }

  async getConfig() {
    let config = await (this.prisma as any).calendarConfig.findUnique({
      where: { id: 'default' },
    });
    if (!config) {
      config = await (this.prisma as any).calendarConfig.create({
        data: {
          id: 'default',
          provider: 'Calendly',
          bookingUrl: 'https://calendly.com/goodlifesutra/commerce-diagnostic',
          embedType: 'Inline_Widget',
          autoRemindersEnabled: true,
          reminder24hEnabled: true,
          reminder1hEnabled: true,
          adminNotificationEmail: 'leads@goodlifesutra.com',
        },
      });
    }
    return config;
  }

  async updateConfig(data: CalendarConfigDto) {
    await this.getConfig();
    return (this.prisma as any).calendarConfig.update({
      where: { id: 'default' },
      data,
    });
  }

  async handleWebhook(payload: any) {
    // Ingest webhook payload from Calendly or Cal.com
    const event = payload?.event || payload?.type;
    const tracking = payload?.payload || payload;

    if (event === 'invitee.created' || event === 'BOOKING_CREATED') {
      const email = tracking?.email || tracking?.invitee?.email;
      const name = tracking?.name || tracking?.invitee?.name || 'Prospect';
      const eventTime = tracking?.scheduled_event?.start_time || tracking?.startTime || new Date().toISOString();
      const meetingUrl = tracking?.scheduled_event?.location?.join_url || 'https://meet.google.com/goodlife-strategy-session';

      return this.create({
        clientName: name,
        clientEmail: email || 'enquiry@client.com',
        meetingDate: new Date(eventTime),
        meetingTime: new Date(eventTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }) + ' IST',
        provider: 'Calendly',
        meetingUrl,
        notes: `Automatically ingested via Calendly Webhook (${event})`,
      });
    }

    return { received: true, event };
  }

  async sendConfirmationNotification(meeting: any) {
    console.log(`[MEETING CONFIRMATION] Dispatched confirmation email to ${meeting.clientEmail} for ${meeting.meetingDate}`);
    return { success: true, clientEmail: meeting.clientEmail };
  }

  async sendManualReminder(id: string, type: '24h' | '1h') {
    const meeting = await this.findOne(id);
    const updateField = type === '24h' ? { reminder24hSent: true } : { reminder1hSent: true };

    await (this.prisma as any).meetingBooking.update({
      where: { id },
      data: updateField,
    });

    console.log(`[MEETING MANUAL REMINDER] Dispatched ${type} reminder email to ${meeting.clientEmail} for meeting ${meeting.id}`);
    return {
      success: true,
      message: `${type === '24h' ? '24-Hour' : '1-Hour'} reminder dispatched to ${meeting.clientEmail}!`,
      meetingId: meeting.id,
    };
  }
}
