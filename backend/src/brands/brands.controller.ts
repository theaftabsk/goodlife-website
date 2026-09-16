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
import { BrandsService } from './brands.service';

@Controller('api/v1/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.brandsService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.brandsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.brandsService.update(id, data);
  }

  @Patch('reorder')
  reorder(@Body() body: { items: { id: string; orderIndex: number }[] }) {
    return this.brandsService.reorder(body.items);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.delete(id);
  }
}
