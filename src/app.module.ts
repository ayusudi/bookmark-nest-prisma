import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BookmarkService } from './bookmark.service'
import { PrismaService } from './prisma.service'
import { UserService } from './user.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, AppService, UserService, BookmarkService],
})
export class AppModule {}