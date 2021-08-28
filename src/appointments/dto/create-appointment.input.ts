import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  patient: string;

  @Field()
  note: string;
}
