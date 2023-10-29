import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookEntity } from './entities/book.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookEntity }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
