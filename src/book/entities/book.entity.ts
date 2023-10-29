import { HydratedDocument } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true, versionKey: false })
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  summary: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const BookEntity = SchemaFactory.createForClass(Book);
