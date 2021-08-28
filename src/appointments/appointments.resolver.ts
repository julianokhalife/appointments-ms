import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';

@Resolver('Appointment')
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Mutation('createAppointment')
  create(
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ) {
    return this.appointmentsService.create(createAppointmentInput);
  }

  @Query('appointments')
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Query('appointment')
  findOne(@Args('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Mutation('updateAppointment')
  update(
    @Args('updateAppointmentInput')
    updateAppointmentInput: UpdateAppointmentInput,
  ) {
    return this.appointmentsService.update(
      updateAppointmentInput.id,
      updateAppointmentInput,
    );
  }

  @Mutation('removeAppointment')
  remove(@Args('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
