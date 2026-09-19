import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { MeetingsService, MeetingBookingDto, CalendarConfigDto } from './meetings.service';

@Controller('api/v1/meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.meetingsService.findAll(status);
  }

  @Get('config')
  getConfig() {
    return this.meetingsService.getConfig();
  }

  @Put('config')
  updateConfig(@Body() data: CalendarConfigDto) {
    return this.meetingsService.updateConfig(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingsService.findOne(id);
  }

  @Post()
  create(@Body() data: MeetingBookingDto) {
    return this.meetingsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<MeetingBookingDto>) {
    return this.meetingsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.meetingsService.delete(id);
  }

  @Post(':id/remind')
  sendReminder(
    @Param('id') id: string,
    @Body('type') type: '24h' | '1h',
  ) {
    return this.meetingsService.sendManualReminder(id, type || '24h');
  }

  @Post('webhook')
  handleWebhook(@Body() payload: any) {
    return this.meetingsService.handleWebhook(payload);
  }
}
