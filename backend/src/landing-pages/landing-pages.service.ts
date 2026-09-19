import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LandingPagesService {
  constructor(private prisma: PrismaService) {}

  async getLandingPages() {
    try {
      const record = await this.prisma.setting.findUnique({
        where: { key: 'landing_pages' },
      });
      if (record && record.value) {
        return JSON.parse(record.value);
      }
    } catch (err) {
      console.warn('Fallback: Unable to load landing_pages from Setting table', err);
    }

    // Default fallback initial landing pages
    return [
      {
        id: 'lp-1',
        title: 'Diwali Appliance Scale Surge 2026',
        slug: 'diwali-appliance-scale',
        sections: ['Hero Banner', 'Proof Metrics', 'Features Grid', 'FAQ Accordion', 'Diagnostic Lead Form'],
        status: 'Active',
        ctaText: 'Claim Festival Allocation →',
        lastUpdated: 'Sep 18, 2026',
      },
      {
        id: 'lp-2',
        title: 'OEM Institutional B2B Procurement',
        slug: 'oem-b2b-procurement',
        sections: ['Hero Banner', 'Proof Metrics', 'Features Grid', 'Call-to-Action Strip', 'Diagnostic Lead Form'],
        status: 'Active',
        ctaText: 'Schedule Institutional Audit',
        lastUpdated: 'Sep 14, 2026',
      },
    ];
  }

  async saveLandingPages(pages: any[]) {
    try {
      const valueStr = JSON.stringify(pages);
      await this.prisma.setting.upsert({
        where: { key: 'landing_pages' },
        update: { value: valueStr },
        create: { key: 'landing_pages', value: valueStr },
      });
      return { success: true, count: pages.length };
    } catch (err) {
      console.error('Error saving landing_pages to database:', err);
      return { success: false, error: String(err) };
    }
  }
}
