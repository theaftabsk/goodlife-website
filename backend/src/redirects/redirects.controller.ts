import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { CreateRedirectDto, UpdateRedirectDto } from './dto/create-redirect.dto';

@Controller('api/v1/redirects')
export class RedirectsController {
  constructor(private readonly redirectsService: RedirectsService) {}

  @Get()
  async getAll() {
    return this.redirectsService.getAll();
  }

  @Get('resolve')
  async resolve(@Query('path') path: string) {
    return this.redirectsService.resolve(path || '');
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.redirectsService.getOne(id);
  }

  @Post()
  async create(@Body() dto: CreateRedirectDto) {
    return this.redirectsService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRedirectDto) {
    return this.redirectsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.redirectsService.delete(id);
  }

  @Post(':id/hit')
  async hit(@Param('id') id: string) {
    return this.redirectsService.recordHit(id);
  }
}
