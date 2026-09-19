import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCrmDto, TestCrmDto } from './dto/update-crm.dto';

@Injectable()
export class CrmService {
  private readonly logger = new Logger(CrmService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getConfig() {
    try {
      let config = await this.prisma.crmIntegration.findUnique({
        where: { id: 'default' },
      });

      if (!config) {
        config = await this.prisma.crmIntegration.create({
          data: {
            id: 'default',
            isConnected: false,
            provider: '',
            webhookUrl: '',
            apiKey: '',
            autoSync: false,
            notificationEmail: '',
            lastSyncStatus: 'Not Connected',
            totalSyncedCount: 0,
            totalFailedCount: 0,
          },
        });
      }

      return config;
    } catch (error) {
      this.logger.error('Failed to get CRM config from database', error);
      throw error;
    }
  }

  async updateConfig(dto: UpdateCrmDto) {
    try {
      const hasUrl = Boolean(dto.webhookUrl && dto.webhookUrl.trim());
      const isConnected = dto.isConnected !== undefined ? dto.isConnected : hasUrl;

      const updated = await this.prisma.crmIntegration.upsert({
        where: { id: 'default' },
        create: {
          id: 'default',
          isConnected,
          provider: dto.provider?.trim() || (hasUrl ? 'Custom Webhook' : ''),
          webhookUrl: dto.webhookUrl?.trim() || '',
          apiKey: dto.apiKey?.trim() || '',
          autoSync: Boolean(dto.autoSync),
          notificationEmail: dto.notificationEmail?.trim() || '',
          lastSyncStatus: isConnected ? 'Configured · Ready to Sync' : 'Not Connected',
        },
        update: {
          ...(dto.provider !== undefined && { provider: dto.provider.trim() }),
          ...(dto.webhookUrl !== undefined && { webhookUrl: dto.webhookUrl.trim() }),
          ...(dto.apiKey !== undefined && { apiKey: dto.apiKey.trim() }),
          ...(dto.autoSync !== undefined && { autoSync: dto.autoSync }),
          ...(dto.notificationEmail !== undefined && { notificationEmail: dto.notificationEmail.trim() }),
          ...(dto.isConnected !== undefined && { isConnected: dto.isConnected }),
          lastSyncStatus: isConnected ? 'Configured · Ready to Sync' : 'Not Connected',
        },
      });

      // Audit Log
      await this.prisma.crmAuditLog.create({
        data: {
          action: 'CONFIG_UPDATED',
          status: 'SUCCESS',
          response: `Updated CRM configuration for provider: ${updated.provider || 'None'} (Auto-Sync: ${updated.autoSync ? 'ON' : 'OFF'})`,
        },
      });

      return updated;
    } catch (error) {
      this.logger.error('Failed to update CRM config', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      const updated = await this.prisma.crmIntegration.upsert({
        where: { id: 'default' },
        create: {
          id: 'default',
          isConnected: false,
          provider: '',
          webhookUrl: '',
          apiKey: '',
          autoSync: false,
          lastSyncStatus: 'Disconnected',
        },
        update: {
          isConnected: false,
          autoSync: false,
          provider: '',
          webhookUrl: '',
          apiKey: '',
          lastSyncStatus: 'Disconnected',
        },
      });

      await this.prisma.crmAuditLog.create({
        data: {
          action: 'DISCONNECTED',
          status: 'WARNING',
          response: 'CRM connection disabled by administrator. Inbound leads will remain strictly in local database.',
        },
      });

      return updated;
    } catch (error) {
      this.logger.error('Failed to disconnect CRM', error);
      throw error;
    }
  }

  async testConnection(dto?: TestCrmDto) {
    const config = await this.getConfig();
    const webhookUrl = dto?.webhookUrl?.trim() || config.webhookUrl?.trim();
    const provider = dto?.provider?.trim() || config.provider || 'CRM Endpoint';
    const apiKey = dto?.apiKey?.trim() || config.apiKey;

    if (!webhookUrl) {
      const errMsg = 'Cannot test connection: Webhook URL is empty.';
      await this.prisma.crmAuditLog.create({
        data: {
          action: 'TEST_CONNECTION',
          status: 'FAILED',
          errorMessage: errMsg,
        },
      });
      return {
        success: false,
        httpCode: 400,
        message: errMsg,
      };
    }

    const testPayload = {
      event: 'goodlife.crm.test_connection',
      timestamp: new Date().toISOString(),
      source: 'Good Life Sutra CMS Integration Gateway',
      testLead: {
        leadCode: 'GL-VERIFY-001',
        company: 'Good Life Test Company',
        contactName: 'Verification Bot',
        email: 'test-webhook@goodlifesutra.com',
        mobile: '+919732351545',
        category: 'Diagnostic Inbound',
        gmvBand: '₹5 Cr - ₹15 Cr',
        intent: 'Test payload dispatch to verify live API connection',
      },
    };

    const startTime = Date.now();

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'GoodLifeSutra-CRM-Gateway/2026.1',
      };
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
        headers['X-Api-Key'] = apiKey;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(testPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const durationMs = Date.now() - startTime;
      const resText = await res.text().catch(() => '');

      const isSuccess = res.status >= 200 && res.status < 300;

      await this.prisma.crmAuditLog.create({
        data: {
          action: 'TEST_CONNECTION',
          status: isSuccess ? 'SUCCESS' : 'FAILED',
          httpCode: res.status,
          payload: testPayload,
          response: `HTTP ${res.status} (${durationMs}ms): ${resText.slice(0, 500)}`,
          errorMessage: isSuccess ? null : `HTTP Error ${res.status}: ${resText.slice(0, 300)}`,
        },
      });

      if (isSuccess) {
        await this.prisma.crmIntegration.update({
          where: { id: 'default' },
          data: {
            isConnected: true,
            provider: provider,
            webhookUrl: webhookUrl,
            lastSyncStatus: `Connected · Verified (HTTP ${res.status} in ${durationMs}ms)`,
            lastSyncTime: new Date(),
            lastErrorMessage: null,
          },
        });
      } else {
        await this.prisma.crmIntegration.update({
          where: { id: 'default' },
          data: {
            lastSyncStatus: `Sync Error (HTTP ${res.status})`,
            lastErrorMessage: `Endpoint returned HTTP ${res.status}`,
          },
        });
      }

      return {
        success: isSuccess,
        httpCode: res.status,
        durationMs,
        message: isSuccess
          ? `Connection verified successfully! ${provider} endpoint responded with HTTP ${res.status} (${durationMs}ms).`
          : `Connection test failed: ${provider} returned HTTP ${res.status}.`,
        responseBody: resText.slice(0, 500),
      };
    } catch (error: any) {
      const durationMs = Date.now() - startTime;
      const errMsg = error.name === 'AbortError' ? 'Connection timed out after 10 seconds' : error.message;

      await this.prisma.crmAuditLog.create({
        data: {
          action: 'TEST_CONNECTION',
          status: 'FAILED',
          errorMessage: `Network error: ${errMsg} (${durationMs}ms)`,
        },
      });

      await this.prisma.crmIntegration.update({
        where: { id: 'default' },
        data: {
          lastSyncStatus: 'Connection Failed',
          lastErrorMessage: errMsg,
        },
      });

      return {
        success: false,
        httpCode: 0,
        durationMs,
        message: `Network request error: ${errMsg}`,
      };
    }
  }

  async syncPendingLeads() {
    const config = await this.getConfig();

    if (!config.isConnected || !config.webhookUrl) {
      throw new Error('Cannot sync: No CRM is currently connected or webhook URL is missing.');
    }

    const pendingLeads = await this.prisma.diagnosticLead.findMany({
      where: {
        NOT: {
          crmStatus: { startsWith: 'Synced to' },
        },
      },
      take: 25,
    });

    if (pendingLeads.length === 0) {
      return {
        totalProcessed: 0,
        synced: 0,
        failed: 0,
        message: 'No pending leads found to sync.',
      };
    }

    let synced = 0;
    let failed = 0;

    for (const lead of pendingLeads) {
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
          source: lead.utmSource || 'Website Diagnostic',
          timeline: lead.timeline,
          intent: lead.intent,
        },
      };

      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'User-Agent': 'GoodLifeSutra-CRM-Gateway/2026.1',
        };
        if (config.apiKey) {
          headers['Authorization'] = `Bearer ${config.apiKey}`;
        }

        const res = await fetch(config.webhookUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        if (res.status >= 200 && res.status < 300) {
          synced++;
          await this.prisma.diagnosticLead.update({
            where: { id: lead.id },
            data: { crmStatus: `Synced to ${config.provider || 'CRM'}` },
          });

          await this.prisma.crmAuditLog.create({
            data: {
              leadId: lead.id,
              leadCompany: lead.company,
              leadEmail: lead.email,
              action: 'PUSH_LEAD',
              status: 'SUCCESS',
              httpCode: res.status,
              response: `Pushed lead ${lead.leadCode} (${lead.company}) - HTTP ${res.status}`,
            },
          });
        } else {
          failed++;
          await this.prisma.crmAuditLog.create({
            data: {
              leadId: lead.id,
              leadCompany: lead.company,
              leadEmail: lead.email,
              action: 'PUSH_LEAD',
              status: 'FAILED',
              httpCode: res.status,
              errorMessage: `HTTP ${res.status} when syncing lead ${lead.leadCode}`,
            },
          });
        }
      } catch (err: any) {
        failed++;
        await this.prisma.crmAuditLog.create({
          data: {
            leadId: lead.id,
            leadCompany: lead.company,
            leadEmail: lead.email,
            action: 'PUSH_LEAD',
            status: 'FAILED',
            errorMessage: `Exception: ${err.message}`,
          },
        });
      }
    }

    await this.prisma.crmIntegration.update({
      where: { id: 'default' },
      data: {
        totalSyncedCount: { increment: synced },
        totalFailedCount: { increment: failed },
        lastSyncTime: new Date(),
        lastSyncStatus: failed === 0 ? 'All leads synced' : `Partially synced (${synced} ok, ${failed} failed)`,
      },
    });

    return {
      totalProcessed: pendingLeads.length,
      synced,
      failed,
      message: `Pushed ${synced} leads to ${config.provider || 'CRM'}${failed > 0 ? ` (${failed} failed)` : ''}.`,
    };
  }

  async getAuditLogs() {
    return this.prisma.crmAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 60,
    });
  }

  async clearAuditLogs() {
    await this.prisma.crmAuditLog.deleteMany({});
    return { success: true, message: 'CRM audit logs cleared.' };
  }
}
