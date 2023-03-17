import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BookmarkService } from './bookmark.service';
import { User as UserModel, Bookmark as BookmarkModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly bookmarkService: BookmarkService,
  ) { }

  @Get('bookmark/:id')
  async getBookmarkById(@Param('id') id: string): Promise<BookmarkModel> {
    return this.bookmarkService.bookmark({ id: Number(id) });
  }

  @Get('bookmark')
  async getBookmarks(): Promise<BookmarkModel[]> {
    return this.bookmarkService.listBookmark();
  }

  @Get('feed')
  async getPublishedPosts(): Promise<BookmarkModel[]> {
    return this.bookmarkService.bookmarks({
      where: { published: true },
    });
  }

  @Get('filtered-bookmark/:searchString')
  async getFilteredBookmarks(
    @Param('searchString') searchString: string,
  ): Promise<BookmarkModel[]> {
    return this.bookmarkService.bookmarks({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            link: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('bookmark')
  async createDraft(
    @Body() bookmarkData: { title: string; link?: string; authorEmail: string },
  ): Promise<BookmarkModel> {
    const { title, link, authorEmail } = bookmarkData;
    return this.bookmarkService.createBookmark({
      title,
      link,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishBookmark(@Param('id') id: string): Promise<BookmarkModel> {
    return this.bookmarkService.updateBookmark({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('bookmark/:id')
  async deleteBookmark(@Param('id') id: string): Promise<BookmarkModel> {
    return this.bookmarkService.deleteBookmark({ id: Number(id) });
  }
}