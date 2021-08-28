import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { ApolloError } from 'apollo-server-errors';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(
    createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    await this.appointmentModel.init();
    const record = new this.appointmentModel({
      ...createAppointmentInput,
      dateCreated: new Date(),
    });
    return record.save();
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) {
      throw new ApolloError('Appointment not found', 'NOT_FOUND');
    }
    return appointment;
  }

  async update(id: string, updateAppointmentInput: UpdateAppointmentInput) {
    const updatedData = updateAppointmentInput;
    delete updatedData.id;
    const result = await this.appointmentModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      },
    );
    if (!result) {
      throw new ApolloError('Appointment not found', 'NOT_FOUND');
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.appointmentModel.findByIdAndDelete(id);
    if (!result) {
      throw new ApolloError('Appointment not found', 'NOT_FOUND');
    }
  }
}
