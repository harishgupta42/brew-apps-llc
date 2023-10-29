import { FilterQuery } from "mongoose";
import { I18n, I18nContext } from "nestjs-i18n";

import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBasicAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

import { ApiResponse } from "../interfaces/api-response";
import { CreateBookDto } from "./dto/create-book.dto";
import { FetchBookDto } from "./dto/fetch-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BookService } from "./book.service";
import { BookDocument } from "./entities/book.entity";
import { BasicAuthGuard } from "../auth/basic-auth.guard";

@Catch()
@ApiTags("book")
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: "Create book" })
  @ApiBasicAuth()
  @Post()
  async createBook(
    @Req() request: any,
    @Body() body: CreateBookDto,
    @I18n() i18n: I18nContext
  ): Promise<ApiResponse> {
    let book = await this.bookService.findOne({
      title: body.title,
    });
    if (book)
      throw new HttpException(
        await i18n.t("message.bookAlreadyExists"),
        HttpStatus.BAD_REQUEST
      );

    book = await this.bookService.create({
      ...body,
    });

    return {
      statusCode: HttpStatus.OK,
      message: i18n.t("message.success"),
      data: book,
    };
  }

  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: "Fetch books" })
  @ApiBasicAuth()
  @Get()
  async fetchBooks(
    @Req() request: any,
    @Query() query: FetchBookDto,
    @I18n() i18n: I18nContext
  ): Promise<ApiResponse> {
    const filter: FilterQuery<BookDocument> = {};

    if (query.id) filter._id = query.id;
    if (query.keyword) {
      filter["$or"] = [
        { title: { $regex: `${query.keyword}`, $options: "i" } },
        { summary: { $regex: `${query.keyword}`, $options: "i" } },
        { author: { $regex: `${query.keyword}`, $options: "i" } },
      ];
    }
    const [bookArray, count] = await Promise.all([
      this.bookService.find(filter, {
        limit: query.limit,
        skip: query.skip,
        sort: { createdAt: -1 },
      }),
      this.bookService.count(filter),
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: await i18n.t("message.success"),
      data: { bookArray, count },
    };
  }

  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: "Update books" })
  @ApiBasicAuth()
  @ApiParam({ name: "id", type: "string" })
  @Put("/:id")
  async updateBook(
    @Req() request: any,
    @Param() param: { id: string },
    @Body() body: UpdateBookDto,
    @I18n() i18n: I18nContext
  ): Promise<ApiResponse> {
    const book = await this.bookService.findOne({
      _id: param.id,
    });
    if (!book)
      throw new HttpException(
        await i18n.t("message.bookNotFound"),
        HttpStatus.NOT_FOUND
      );

    if (body.title) {
      const sameTitleBook = await this.bookService.findOne({
        title: body.title,
      });
      if (sameTitleBook)
        throw new HttpException(
          await i18n.t("message.bookAlreadyExists"),
          HttpStatus.BAD_REQUEST
        );
    }

    await this.bookService.updateOne({ _id: book._id }, { $set: body });

    return {
      statusCode: HttpStatus.OK,
      message: i18n.t("message.success"),
    };
  }
  @UseGuards(BasicAuthGuard)
  @ApiOperation({ summary: "Delete book" })
  @ApiBasicAuth()
  @ApiParam({ name: "id", type: "string" })
  @Delete("/:id")
  async deleteBook(
    @Req() request: any,
    @Param() param: { id: string },
    @I18n() i18n: I18nContext
  ): Promise<ApiResponse> {
    const book = await this.bookService.findOne({
      _id: param.id,
    });
    if (!book)
      throw new HttpException(
        await i18n.t("message.bookNotFound"),
        HttpStatus.NOT_FOUND
      );

    await this.bookService.deleteOne({ _id: book._id });

    return {
      statusCode: HttpStatus.OK,
      message: i18n.t("message.success"),
    };
  }
}
