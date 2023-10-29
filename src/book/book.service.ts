import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Book, BookDocument } from './entities/book.entity';

@Injectable()
export class BookService {
  private logger = new Logger(Book.name);
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(data: Book): Promise<BookDocument> {
    return this.bookModel.create(data);
  }

  async updateOne(
    filter: FilterQuery<BookDocument>,
    data: UpdateQuery<Book>,
  ): Promise<BookDocument> {
    return this.bookModel.findOneAndUpdate({ ...filter }, data, { new: true });
  }

  async deleteOne(filter: FilterQuery<BookDocument>): Promise<void> {
    await this.bookModel.deleteOne({ ...filter });
  }

  async findOne(
    filter: FilterQuery<BookDocument>,
    options?: QueryOptions<BookDocument>,
  ): Promise<BookDocument | null> {
    return this.bookModel.findOne(filter, null, options);
  }

  async find(
    filter: FilterQuery<BookDocument>,
    options?: QueryOptions<BookDocument>,
  ): Promise<BookDocument[] | []> {
    return this.bookModel.find(filter, null, options);
  }

  async count(filter: FilterQuery<BookDocument>): Promise<number> {
    return this.bookModel.count(filter);
  }

  async updateMany(
    filter: FilterQuery<BookDocument>,
    data: Partial<Book>,
  ): Promise<void> {
    await this.bookModel.updateMany({ ...filter }, data);
  }
}
