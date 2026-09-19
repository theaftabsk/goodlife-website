import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface SiteConfigurationDto {
  companyName?: string;
  phone?: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  whatsappNumber?: string;
  headerCtaText?: string;
  heroHeadline?: string;
  announcementText?: string;
  announcementEnabled?: boolean;
  announcementLink?: string;
  announcementTheme?: string;
  headerPhoneBadge?: string;
  cinNumber?: string;
  registeredCity?: string;
  supportHours?: string;
  preFooterTag?: string;
  preFooterHeading?: string;
  preFooterSubtext?: string;
  preFooterCta?: string;
  preFooterBgImage?: string;
  copyrightText?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  googleSearchConsoleVerification?: string;
}

const DEFAULT_SETTINGS = {
  id: 'default',
  companyName: 'Good Life Sutra Pvt. Ltd.',
  phone: '+91 88821 57074',
  email: 'growth@goodlifesutra.com',
  address: 'Plot 42, Udyog Vihar Phase IV, Sector 18, Gurugram, Haryana 122015, India',
  gstNumber: '06AABCG1234F1Z8',
  whatsappNumber: '+91 88821 57074',
  headerCtaText: 'Request Diagnostic →',
  heroHeadline: 'Scale Ecommerce. Not Complexity.',
  announcementText: 'Operating across 15+ Platforms & 23+ Leading Brands Nationwide',
  announcementEnabled: true,
  announcementLink: '/case-studies',
  announcementTheme: 'slate',
  headerPhoneBadge: '+91 88821 57074',
  cinNumber: 'U74999MH2021PTC368942',
  registeredCity: 'Gurugram, Haryana & Mumbai, India',
  supportHours: 'Mon - Sat: 9:30 AM - 7:00 PM IST',
  preFooterTag: 'READY TO SCALE?',
  preFooterHeading: 'Grow your ecommerce business with us',
  preFooterSubtext: 'Request our complimentary Commerce Diagnostic to identify leakage points and unlock new channel growth.',
  preFooterCta: 'UNLOCK YOUR GROWTH →',
  preFooterBgImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  copyrightText: '© 2026 Good Life Sutra Pvt. Ltd. All rights reserved.',
  linkedinUrl: 'https://linkedin.com/company/good-life-sutra',
  twitterUrl: 'https://x.com/goodlifesutra',
  youtubeUrl: 'https://youtube.com/@goodlifesutra',
  ga4MeasurementId: '',
  gtmContainerId: '',
  googleSearchConsoleVerification: '',
};

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedDefaultsIfNeeded();
  }

  private async seedDefaultsIfNeeded() {
    try {
      const existing = await this.prisma.siteConfiguration.findUnique({
        where: { id: 'default' },
      });
      if (!existing) {
        await this.prisma.siteConfiguration.create({
          data: DEFAULT_SETTINGS,
        });
        console.log('✅ Seeded default SiteConfiguration in PostgreSQL database');
      }
    } catch (error) {
      console.warn('⚠️ Could not initialize default site configuration:', error.message);
    }
  }

  async getSettings() {
    let settings = await this.prisma.siteConfiguration.findUnique({
      where: { id: 'default' },
    });
    if (!settings) {
      settings = await this.prisma.siteConfiguration.create({
        data: DEFAULT_SETTINGS,
      });
    }
    return settings;
  }

  async updateSettings(data: SiteConfigurationDto) {
    const updated = await this.prisma.siteConfiguration.upsert({
      where: { id: 'default' },
      update: {
        ...data,
      },
      create: {
        ...DEFAULT_SETTINGS,
        ...data,
      },
    });
    return updated;
  }

  async resetDefaults() {
    const reset = await this.prisma.siteConfiguration.upsert({
      where: { id: 'default' },
      update: {
        ...DEFAULT_SETTINGS,
      },
      create: {
        ...DEFAULT_SETTINGS,
      },
    });
    return reset;
  }
}
