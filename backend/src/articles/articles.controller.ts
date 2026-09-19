import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ArticlesService, ArticleInput } from './articles.service';

@Controller('api/v1/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.articlesService.findAll({ category, status, search });
  }

  @Get('published')
  findPublished(@Query('category') category?: string) {
    return this.articlesService.findPublished(category);
  }

  @Get(':slugOrId')
  findOne(@Param('slugOrId') slugOrId: string) {
    return this.articlesService.findOne(slugOrId);
  }

  @Post()
  create(@Body() data: ArticleInput) {
    return this.articlesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<ArticleInput>) {
    return this.articlesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articlesService.delete(id);
  }

  @Patch(':id/toggle')
  toggleStatus(@Param('id') id: string) {
    return this.articlesService.toggleStatus(id);
  }

  @Post(':id/duplicate')
  duplicate(@Param('id') id: string) {
    return this.articlesService.duplicate(id);
  }
}
