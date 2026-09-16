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
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('active')
  findActive() {
    return this.categoriesService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.categoriesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.categoriesService.update(id, data);
  }

  @Patch('reorder')
  reorder(@Body() body: { items: { id: string; orderIndex: number }[] }) {
    return this.categoriesService.reorder(body.items);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
