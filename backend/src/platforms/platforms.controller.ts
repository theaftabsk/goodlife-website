import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { PlatformsService } from './platforms.service';

@Controller('api/v1/platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Get()
  findAll() {
    return this.platformsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.platformsService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformsService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.platformsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.platformsService.update(id, data);
  }

  @Patch('reorder')
  reorder(@Body() body: { items: { id: string; orderIndex: number }[] }) {
    return this.platformsService.reorder(body.items);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.platformsService.delete(id);
  }
}
