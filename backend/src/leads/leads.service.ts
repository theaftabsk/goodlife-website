import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAllLeads() {
    try {
      const leads = await this.prisma.diagnosticLead.findMany({
        orderBy: { createdAt: 'desc' },
      });

      // Format for frontend compatibility
      return leads.map((l) => ({
        id: l.id,
        leadCode: l.leadCode,
        company: l.company,
        contact: l.contactName,
        contactName: l.contactName,
        designation: l.designation,
        email: l.email,
        mobile: l.mobile,
        category: l.category,
        gmv: l.gmvBand,
        gmvBand: l.gmvBand,
        revenueBand: l.revenueBand,
        orderVolume: l.orderVolume,
        operatingModel: l.opModel,
        opModel: l.opModel,
        warehouseModel: l.warehouses,
        warehouses: l.warehouses,
        challenges: l.challenges,
        reconciled: l.reconciled ? 'Compliant' : 'Needs Audit',
        intent: l.intent,
        timeline: l.timeline,
        fitScore: l.fitScore,
        fitLabel: l.fitLabel,
        tags: l.tags,
        crmStatus: l.crmStatus || 'New Inbound',
        source: l.utmSource || 'Direct Website Inbound',
        utmSource: l.utmSource,
        utmCampaign: l.utmCampaign,
        date: new Date(l.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        createdAt: l.createdAt,
      }));
    } catch (error) {
      this.logger.error('Failed to get leads from PostgreSQL database', error);
      throw error;
    }
  }

  async getLeadById(id: string) {
    return this.prisma.diagnosticLead.findUnique({
      where: { id },
    });
  }

  async createLead(dto: CreateLeadDto) {
    try {
      const randomCode = `GL-${Math.floor(1000 + Math.random() * 9000)}`;

      // Determine genuine source origin
      let detectedSource = dto.source || dto.utmSource || 'Website Form';
      if (detectedSource.includes('diwali')) {
        detectedSource = 'Landing Page: Diwali Appliance Surge';
      } else if (detectedSource.includes('oem')) {
        detectedSource = 'Landing Page: OEM B2B Procurement';
      } else if (detectedSource.toLowerCase().includes('diagnostic') || detectedSource.toLowerCase().includes('modal')) {
        detectedSource = 'Diagnostic Tool (Popup Modal)';
      } else if (detectedSource.toLowerCase().includes('contact')) {
        detectedSource = 'Contact Us Page';
      }

      const lead = await this.prisma.diagnosticLead.create({
        data: {
          leadCode: randomCode,
          company: dto.company || 'Prospective Brand',
          contactName: dto.contactName || dto.contact || 'Direct Contact',
          designation: dto.designation || 'Business Representative',
          email: dto.email,
          mobile: dto.mobile,
          category: dto.category || 'General Inbound',
          revenueBand: dto.revenueBand || 'Not Specified',
          gmvBand: dto.gmvBand || dto.gmv || 'Not Specified',
          orderVolume: dto.orderVolume || null,
          opModel: dto.opModel || dto.operatingModel || null,
          warehouses: dto.warehouses || dto.warehouseModel || null,
          challenges: dto.challenges && dto.challenges.length > 0 ? dto.challenges : [],
          reconciled: typeof dto.reconciled === 'boolean' ? dto.reconciled : false,
          intent: dto.intent || 'Request Custom Launch Plan',
          timeline: dto.timeline || 'Immediate',
          fitScore: 85,
          fitLabel: 'Direct Inbound Lead',
          tags: ['Real Inbound Lead'],
          crmStatus: 'New Inbound',
          utmSource: detectedSource,
          utmCampaign: dto.utmCampaign || 'Organic Direct',
        },
      });

      this.logger.log(`Saved genuine inbound lead: ${lead.company} (${lead.leadCode}) from ${detectedSource}`);

      // Check if CRM auto-sync is active
      try {
        const crm = await this.prisma.crmIntegration.findUnique({ where: { id: 'default' } });
        if (crm && crm.isConnected && crm.autoSync && crm.webhookUrl) {
          const payload = {
            event: 'goodlife.lead.created',
            timestamp: new Date().toISOString(),
            lead: {
              leadCode: lead.leadCode,
              company: lead.company,
              contactName: lead.contactName,
              email: lead.email,
              mobile: lead.mobile,
              category: lead.category,
              gmvBand: lead.gmvBand,
              source: detectedSource,
              timeline: lead.timeline,
              intent: lead.intent,
            },
          };

          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'User-Agent': 'GoodLifeSutra-CRM-Gateway/2026.1',
          };
          if (crm.apiKey) {
            headers['Authorization'] = `Bearer ${crm.apiKey}`;
          }

          const res = await fetch(crm.webhookUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
          });

          if (res.status >= 200 && res.status < 300) {
            await this.prisma.diagnosticLead.update({
              where: { id: lead.id },
              data: { crmStatus: `Synced to ${crm.provider || 'CRM'}` },
            });
            await this.prisma.crmAuditLog.create({
              data: {
                leadId: lead.id,
                leadCompany: lead.company,
                leadEmail: lead.email,
                action: 'AUTO_SYNC',
                status: 'SUCCESS',
                httpCode: res.status,
                response: `Auto-synced lead ${lead.leadCode} to ${crm.provider || 'CRM'} (HTTP ${res.status})`,
              },
            });
          } else {
            await this.prisma.crmAuditLog.create({
              data: {
                leadId: lead.id,
                leadCompany: lead.company,
                leadEmail: lead.email,
                action: 'AUTO_SYNC',
                status: 'FAILED',
                httpCode: res.status,
                errorMessage: `Auto-sync failed with HTTP ${res.status}`,
              },
            });
          }
        }
      } catch (crmErr: any) {
        this.logger.warn(`CRM auto-sync failed: ${crmErr.message}`);
      }

      return lead;
    } catch (error) {
      this.logger.error('Failed to create diagnostic lead', error);
      throw error;
    }
  }

  async deleteLead(id: string) {
    try {
      return await this.prisma.diagnosticLead.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Failed to delete lead with id ${id}`, error);
      throw error;
    }
  }

  async updateLeadStatus(id: string, crmStatus: string) {
    try {
      return await this.prisma.diagnosticLead.update({
        where: { id },
        data: { crmStatus },
      });
    } catch (error) {
      this.logger.error(`Failed to update crmStatus for lead ${id}`, error);
      throw error;
    }
  }
}
