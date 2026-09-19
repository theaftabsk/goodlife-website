import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FaqsService, FaqDto } from './faqs.service';

@Controller('api/v1/faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(id);
  }

  @Post()
  create(@Body() data: FaqDto) {
    return this.faqsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<FaqDto>) {
    return this.faqsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.faqsService.delete(id);
  }
}
