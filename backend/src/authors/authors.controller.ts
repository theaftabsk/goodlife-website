import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { AuthorsService, AuthorDto } from './authors.service';

@Controller('api/v1/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Post()
  create(@Body() data: AuthorDto) {
    return this.authorsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<AuthorDto>) {
    return this.authorsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.authorsService.delete(id);
  }

  @Patch(':id/toggle')
  toggleStatus(@Param('id') id: string) {
    return this.authorsService.toggleStatus(id);
  }
}
