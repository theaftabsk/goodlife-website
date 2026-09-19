import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('api/v1/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  getAllLeads() {
    return this.leadsService.getAllLeads();
  }

  @Get(':id')
  getLeadById(@Param('id') id: string) {
    return this.leadsService.getLeadById(id);
  }

  @Post()
  createLead(@Body() dto: CreateLeadDto) {
    return this.leadsService.createLead(dto);
  }

  @Post('diagnostic')
  submitDiagnostic(@Body() dto: CreateLeadDto) {
    return this.leadsService.createLead(dto);
  }

  @Delete(':id')
  deleteLead(@Param('id') id: string) {
    return this.leadsService.deleteLead(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('crmStatus') crmStatus: string) {
    return this.leadsService.updateLeadStatus(id, crmStatus);
  }
}
