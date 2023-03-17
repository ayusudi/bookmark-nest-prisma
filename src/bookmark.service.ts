import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Bookmark, Prisma } from '@prisma/client';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async bookmark(
    postWhereUniqueInput: Prisma.BookmarkWhereUniqueInput,
  ): Promise<Bookmark | null> {
    return this.prisma.bookmark.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async bookmarks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookmarkWhereUniqueInput;
    where?: Prisma.BookmarkWhereInput;
    orderBy?: Prisma.BookmarkOrderByWithRelationInput;
  }): Promise<Bookmark[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.bookmark.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async listBookmark(): Promise<Bookmark[]> {
    return this.prisma.bookmark.findMany();
  }

  async createBookmark(data: Prisma.BookmarkCreateInput): Promise<Bookmark> {
    return this.prisma.bookmark.create({
      data,
    });
  }

  async updateBookmark(params: {
    where: Prisma.BookmarkWhereUniqueInput;
    data: Prisma.BookmarkUpdateInput;
  }): Promise<Bookmark> {
    const { data, where } = params;
    return this.prisma.bookmark.update({
      data,
      where,
    });
  }

  async deleteBookmark(where: Prisma.BookmarkWhereUniqueInput): Promise<Bookmark> {
    return this.prisma.bookmark.delete({
      where,
    });
  }
}
