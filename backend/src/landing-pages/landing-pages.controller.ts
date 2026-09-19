import { Controller, Get, Post, Body } from '@nestjs/common';
import { LandingPagesService } from './landing-pages.service';

@Controller('api/v1/landing-pages')
export class LandingPagesController {
  constructor(private readonly landingPagesService: LandingPagesService) {}

  @Get()
  async getLandingPages() {
    return this.landingPagesService.getLandingPages();
  }

  @Post()
  async saveLandingPages(@Body() body: any) {
    const pages = Array.isArray(body) ? body : body.pages || [];
    return this.landingPagesService.saveLandingPages(pages);
  }
}
