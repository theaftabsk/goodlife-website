import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PlatformsModule } from './platforms/platforms.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { LandingPagesModule } from './landing-pages/landing-pages.module';
import { FaqsModule } from './faqs/faqs.module';
import { SettingsModule } from './settings/settings.module';
import { LeadsModule } from './leads/leads.module';
import { CrmModule } from './crm/crm.module';
import { RedirectsModule } from './redirects/redirects.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthorsModule } from './authors/authors.module';
import { MeetingsModule } from './meetings/meetings.module';

@Module({
  imports: [
    PrismaModule,
    PlatformsModule,
    BrandsModule,
    CategoriesModule,
    LandingPagesModule,
    FaqsModule,
    SettingsModule,
    LeadsModule,
    CrmModule,
    RedirectsModule,
    ArticlesModule,
    AuthorsModule,
    MeetingsModule,
  ],
})
export class AppModule {}

