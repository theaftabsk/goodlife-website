import {
  Controller,
  Get,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { SettingsService, SiteConfigurationDto } from './settings.service';

@Controller('api/v1/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  updateSettings(@Body() data: SiteConfigurationDto) {
    return this.settingsService.updateSettings(data);
  }

  @Post('reset')
  resetDefaults() {
    return this.settingsService.resetDefaults();
  }
}
