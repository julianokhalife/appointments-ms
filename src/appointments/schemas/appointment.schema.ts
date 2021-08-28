import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Appointment {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  patient: string;

  @Prop()
  note: string;

  @Prop()
  dateCreated: Date;
}

export type AppointmentDocument = Appointment & Document;

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
