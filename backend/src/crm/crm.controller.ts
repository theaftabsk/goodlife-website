import { Controller, Get, Post, Put, Body, Delete } from '@nestjs/common';
import { CrmService } from './crm.service';
import { UpdateCrmDto, TestCrmDto } from './dto/update-crm.dto';

@Controller('api/v1/crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get()
  async getConfig() {
    return this.crmService.getConfig();
  }

  @Post()
  async updateConfigPost(@Body() dto: UpdateCrmDto) {
    return this.crmService.updateConfig(dto);
  }

  @Put()
  async updateConfigPut(@Body() dto: UpdateCrmDto) {
    return this.crmService.updateConfig(dto);
  }

  @Post('test')
  async testConnection(@Body() dto: TestCrmDto) {
    return this.crmService.testConnection(dto);
  }

  @Post('sync-now')
  async syncNow() {
    return this.crmService.syncPendingLeads();
  }

  @Post('disconnect')
  async disconnect() {
    return this.crmService.disconnect();
  }

  @Get('logs')
  async getAuditLogs() {
    return this.crmService.getAuditLogs();
  }

  @Delete('logs')
  async clearAuditLogs() {
    return this.crmService.clearAuditLogs();
  }
}
